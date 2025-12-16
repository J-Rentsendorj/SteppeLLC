using System.ComponentModel.DataAnnotations;
using AltanDynamics.Api.Models.Enums;

namespace AltanDynamics.Api.Models.DTOs.Lead;

public class CreateLeadDto
{
    [Required]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;
    
    [Required]
    [EmailAddress]
    [MaxLength(256)]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(200)]
    public string Organization { get; set; } = string.Empty;
    
    [Required]
    public InquiryType InquiryType { get; set; }
    
    [Required]
    [MaxLength(2000)]
    public string Message { get; set; } = string.Empty;
    
    [MaxLength(20)]
    public string? Phone { get; set; }
}
