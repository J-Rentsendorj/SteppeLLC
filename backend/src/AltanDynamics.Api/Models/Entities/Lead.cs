using AltanDynamics.Api.Models.Enums;

namespace AltanDynamics.Api.Models.Entities;

public class Lead
{
    public Guid Id { get; set; }
    
    public string FullName { get; set; } = string.Empty;
    
    public string Email { get; set; } = string.Empty;
    
    public string Organization { get; set; } = string.Empty;
    
    public InquiryType InquiryType { get; set; }
    
    public string Message { get; set; } = string.Empty;
    
    public string? Phone { get; set; }
    
    public LeadPriority Priority { get; set; } = LeadPriority.Standard;
    
    public LeadStatus Status { get; set; } = LeadStatus.New;
    
    public string? Notes { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
