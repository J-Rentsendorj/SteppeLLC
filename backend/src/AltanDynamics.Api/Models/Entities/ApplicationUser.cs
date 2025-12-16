using Microsoft.AspNetCore.Identity;
using AltanDynamics.Api.Models.Enums;

namespace AltanDynamics.Api.Models.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FullName { get; set; } = string.Empty;
    
    public string? Organization { get; set; }
    
    public UserRole Role { get; set; } = UserRole.Investor;
    
    public UserStatus Status { get; set; } = UserStatus.Pending;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? ApprovedAt { get; set; }
    
    public Guid? ApprovedById { get; set; }
    
    public ApplicationUser? ApprovedBy { get; set; }
    
    // Navigation properties
    public ICollection<ActivityLog> ActivityLogs { get; set; } = new List<ActivityLog>();
}
