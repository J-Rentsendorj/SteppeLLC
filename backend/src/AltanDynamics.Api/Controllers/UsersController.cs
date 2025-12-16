using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AltanDynamics.Api.Data;
using AltanDynamics.Api.Models.DTOs.User;
using AltanDynamics.Api.Models.Entities;
using AltanDynamics.Api.Models.Enums;

namespace AltanDynamics.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;
    private readonly ILogger<UsersController> _logger;

    public UsersController(
        UserManager<ApplicationUser> userManager,
        ApplicationDbContext context,
        ILogger<UsersController> logger)
    {
        _userManager = userManager;
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Get current user profile
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized();

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return NotFound(new { message = "User not found" });

        return Ok(new UserDto
        {
            Id = user.Id,
            Email = user.Email!,
            FullName = user.FullName,
            Organization = user.Organization,
            Role = user.Role,
            Status = user.Status,
            CreatedAt = user.CreatedAt,
            ApprovedAt = user.ApprovedAt
        });
    }

    /// <summary>
    /// Update current user profile
    /// </summary>
    [HttpPut("me")]
    public async Task<IActionResult> UpdateCurrentUser([FromBody] UpdateUserDto model)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return Unauthorized();

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return NotFound(new { message = "User not found" });

        if (!string.IsNullOrWhiteSpace(model.FullName))
            user.FullName = model.FullName;

        if (model.Organization != null)
            user.Organization = model.Organization;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(new { message = "Failed to update profile" });

        return Ok(new { message = "Profile updated successfully" });
    }

    /// <summary>
    /// Get all users (Admin only)
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetUsers(
        [FromQuery] UserStatus? status = null,
        [FromQuery] UserRole? role = null,
        [FromQuery] string? search = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.Users.AsQueryable();

        if (status.HasValue)
            query = query.Where(u => u.Status == status.Value);

        if (role.HasValue)
            query = query.Where(u => u.Role == role.Value);

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.ToLower();
            query = query.Where(u =>
                u.FullName.ToLower().Contains(search) ||
                u.Email!.ToLower().Contains(search) ||
                (u.Organization != null && u.Organization.ToLower().Contains(search)));
        }

        var totalCount = await query.CountAsync();

        var users = await query
            .OrderByDescending(u => u.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Email = u.Email!,
                FullName = u.FullName,
                Organization = u.Organization,
                Role = u.Role,
                Status = u.Status,
                CreatedAt = u.CreatedAt,
                ApprovedAt = u.ApprovedAt
            })
            .ToListAsync();

        return Ok(new
        {
            data = users,
            totalCount,
            page,
            pageSize,
            totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        });
    }

    /// <summary>
    /// Approve investor account (Admin only)
    /// </summary>
    [HttpPut("{id:guid}/approve")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ApproveUser(Guid id)
    {
        var adminId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (adminId == null)
            return Unauthorized();

        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
            return NotFound(new { message = "User not found" });

        if (user.Status == UserStatus.Approved)
            return BadRequest(new { message = "User is already approved" });

        user.Status = UserStatus.Approved;
        user.ApprovedAt = DateTime.UtcNow;
        user.ApprovedById = Guid.Parse(adminId);

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(new { message = "Failed to approve user" });

        _logger.LogInformation("User approved: {Email} by Admin: {AdminId}", user.Email, adminId);

        // TODO: Send approval email notification

        return Ok(new { message = "User approved successfully" });
    }

    /// <summary>
    /// Reject investor account (Admin only)
    /// </summary>
    [HttpPut("{id:guid}/reject")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> RejectUser(Guid id)
    {
        var adminId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (adminId == null)
            return Unauthorized();

        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
            return NotFound(new { message = "User not found" });

        if (user.Status == UserStatus.Rejected)
            return BadRequest(new { message = "User is already rejected" });

        user.Status = UserStatus.Rejected;
        user.ApprovedAt = DateTime.UtcNow; // Using same field to track rejection time
        user.ApprovedById = Guid.Parse(adminId);

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(new { message = "Failed to reject user" });

        _logger.LogInformation("User rejected: {Email} by Admin: {AdminId}", user.Email, adminId);

        // TODO: Send rejection email notification

        return Ok(new { message = "User rejected successfully" });
    }

    /// <summary>
    /// Get pending investor count (Admin only)
    /// </summary>
    [HttpGet("pending-count")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetPendingCount()
    {
        var count = await _context.Users
            .Where(u => u.Status == UserStatus.Pending)
            .CountAsync();

        return Ok(new { pendingCount = count });
    }
}

public class UpdateUserDto
{
    public string? FullName { get; set; }
    public string? Organization { get; set; }
}
