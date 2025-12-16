using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using AltanDynamics.Api.Models.DTOs.Auth;
using AltanDynamics.Api.Models.Entities;
using AltanDynamics.Api.Models.Enums;

namespace AltanDynamics.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IConfiguration configuration,
        ILogger<AuthController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (!model.AccreditedInvestorAttestation)
            return BadRequest(new { message = "You must attest that you are an accredited investor" });

        var existingUser = await _userManager.FindByEmailAsync(model.Email);
        if (existingUser != null)
            return Conflict(new { message = "An account with this email already exists" });

        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            FullName = model.FullName,
            Organization = model.Organization,
            Role = UserRole.Investor,
            Status = UserStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
        {
            return BadRequest(new { message = "Registration failed", errors = result.Errors.Select(e => e.Description) });
        }

        _logger.LogInformation("New investor registered: {Email}", model.Email);

        return Ok(new { 
            message = "Registration successful. Your account is pending approval.",
            userId = user.Id
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
            return Unauthorized(new { message = "Invalid email or password" });

        var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, lockoutOnFailure: true);

        if (result.IsLockedOut)
            return Unauthorized(new { message = "Account is locked. Please try again later." });

        if (!result.Succeeded)
            return Unauthorized(new { message = "Invalid email or password" });

        // Check if user is approved (for investors)
        if (user.Role == UserRole.Investor && user.Status != UserStatus.Approved)
        {
            return Unauthorized(new { 
                message = user.Status == UserStatus.Pending 
                    ? "Your account is pending approval" 
                    : "Your account has been rejected"
            });
        }

        var token = GenerateJwtToken(user);
        var refreshToken = GenerateRefreshToken();

        _logger.LogInformation("User logged in: {Email}", model.Email);

        return Ok(new TokenDto
        {
            AccessToken = token,
            RefreshToken = refreshToken,
            ExpiresAt = DateTime.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:ExpirationInMinutes"] ?? "60")),
            TokenType = "Bearer"
        });
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto model)
    {
        // In a production app, you would validate the refresh token from database
        // For now, we'll just validate the access token's claims
        var principal = GetPrincipalFromExpiredToken(model.AccessToken);
        if (principal == null)
            return Unauthorized(new { message = "Invalid token" });

        var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized(new { message = "Invalid token" });

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return Unauthorized(new { message = "User not found" });

        var newToken = GenerateJwtToken(user);
        var newRefreshToken = GenerateRefreshToken();

        return Ok(new TokenDto
        {
            AccessToken = newToken,
            RefreshToken = newRefreshToken,
            ExpiresAt = DateTime.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:ExpirationInMinutes"] ?? "60")),
            TokenType = "Bearer"
        });
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email!),
            new(ClaimTypes.Name, user.FullName),
            new(ClaimTypes.Role, user.Role.ToString()),
            new("Status", user.Status.ToString()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:ExpirationInMinutes"] ?? "60")),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static string GenerateRefreshToken()
    {
        return Convert.ToBase64String(Guid.NewGuid().ToByteArray());
    }

    private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)),
            ValidateLifetime = false,
            ValidIssuer = _configuration["Jwt:Issuer"],
            ValidAudience = _configuration["Jwt:Audience"]
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                return null;
            }
            return principal;
        }
        catch
        {
            return null;
        }
    }
}

public class RefreshTokenDto
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}
