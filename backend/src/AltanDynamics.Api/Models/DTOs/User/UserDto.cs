using AltanDynamics.Api.Models.Enums;

namespace AltanDynamics.Api.Models.DTOs.User;

public class UserDto
{
    public Guid Id { get; set; }
    
    public string Email { get; set; } = string.Empty;
    
    public string FullName { get; set; } = string.Empty;
    
    public string? Organization { get; set; }
    
    public UserRole Role { get; set; }
    
    public UserStatus Status { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime? ApprovedAt { get; set; }
}
