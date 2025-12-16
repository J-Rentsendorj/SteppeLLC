namespace AltanDynamics.Api.Models.Entities;

public class ActivityLog
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    public ApplicationUser User { get; set; } = null!;
    
    public string Action { get; set; } = string.Empty;
    
    public string? Details { get; set; }
    
    public string? IpAddress { get; set; }
    
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
