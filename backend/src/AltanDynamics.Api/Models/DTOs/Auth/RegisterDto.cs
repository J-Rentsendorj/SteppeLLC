using System.ComponentModel.DataAnnotations;

namespace AltanDynamics.Api.Models.DTOs.Auth;

public class RegisterDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    [MinLength(8)]
    public string Password { get; set; } = string.Empty;
    
    [Required]
    [Compare("Password")]
    public string ConfirmPassword { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;
    
    [MaxLength(200)]
    public string? Organization { get; set; }
    
    [Required]
    public bool AccreditedInvestorAttestation { get; set; }
}
