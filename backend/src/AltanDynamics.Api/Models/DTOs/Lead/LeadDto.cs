using AltanDynamics.Api.Models.Enums;

namespace AltanDynamics.Api.Models.DTOs.Lead;

public class LeadDto
{
    public Guid Id { get; set; }
    
    public string FullName { get; set; } = string.Empty;
    
    public string Email { get; set; } = string.Empty;
    
    public string Organization { get; set; } = string.Empty;
    
    public InquiryType InquiryType { get; set; }
    
    public string Message { get; set; } = string.Empty;
    
    public string? Phone { get; set; }
    
    public LeadPriority Priority { get; set; }
    
    public LeadStatus Status { get; set; }
    
    public string? Notes { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
}
