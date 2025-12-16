using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AltanDynamics.Api.Data;
using AltanDynamics.Api.Models.DTOs.Lead;
using AltanDynamics.Api.Models.Entities;
using AltanDynamics.Api.Models.Enums;
using AltanDynamics.Api.Services;

namespace AltanDynamics.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeadsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<LeadsController> _logger;
    private readonly IEmailService _emailService;

    public LeadsController(
        ApplicationDbContext context, 
        ILogger<LeadsController> logger,
        IEmailService emailService)
    {
        _context = context;
        _logger = logger;
        _emailService = emailService;
    }

    /// <summary>
    /// Submit a new contact form lead (public endpoint)
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateLead([FromBody] CreateLeadDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Calculate priority based on email domain and inquiry type
        var priority = CalculateLeadPriority(model.Email, model.InquiryType);

        var lead = new Lead
        {
            Id = Guid.NewGuid(),
            FullName = model.FullName,
            Email = model.Email,
            Organization = model.Organization,
            InquiryType = model.InquiryType,
            Message = model.Message,
            Phone = model.Phone,
            Priority = priority,
            Status = LeadStatus.New,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Leads.Add(lead);
        await _context.SaveChangesAsync();

        _logger.LogInformation("New lead created: {Email}, Priority: {Priority}", model.Email, priority);

        // Log critical leads for immediate attention
        if (priority == LeadPriority.Critical)
        {
            _logger.LogWarning("CRITICAL LEAD: {Email} from {Organization} - .mil/.gov domain detected", 
                model.Email, model.Organization);
        }

        // Send email notification (async, don't block response)
        _ = Task.Run(async () =>
        {
            try
            {
                await _emailService.SendLeadNotificationAsync(
                    model.FullName,
                    model.Email,
                    model.Organization,
                    model.InquiryType.ToString(),
                    model.Message,
                    priority.ToString(),
                    model.Phone
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email notification for lead: {LeadId}", lead.Id);
            }
        });

        return Ok(new { 
            message = "Thank you for your inquiry. We will be in touch shortly.",
            leadId = lead.Id,
            priority = priority.ToString()
        });
    }

    /// <summary>
    /// Get all leads (Admin only)
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetLeads(
        [FromQuery] LeadPriority? priority = null,
        [FromQuery] LeadStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.Leads.AsQueryable();

        if (priority.HasValue)
            query = query.Where(l => l.Priority == priority.Value);

        if (status.HasValue)
            query = query.Where(l => l.Status == status.Value);

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.ToLower();
            query = query.Where(l => 
                l.FullName.ToLower().Contains(search) ||
                l.Email.ToLower().Contains(search) ||
                l.Organization.ToLower().Contains(search));
        }

        var totalCount = await query.CountAsync();

        var leads = await query
            .OrderByDescending(l => l.Priority)
            .ThenByDescending(l => l.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(l => new LeadDto
            {
                Id = l.Id,
                FullName = l.FullName,
                Email = l.Email,
                Organization = l.Organization,
                InquiryType = l.InquiryType,
                Message = l.Message,
                Phone = l.Phone,
                Priority = l.Priority,
                Status = l.Status,
                Notes = l.Notes,
                CreatedAt = l.CreatedAt,
                UpdatedAt = l.UpdatedAt
            })
            .ToListAsync();

        return Ok(new
        {
            data = leads,
            totalCount,
            page,
            pageSize,
            totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        });
    }

    /// <summary>
    /// Get a specific lead (Admin only)
    /// </summary>
    [HttpGet("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetLead(Guid id)
    {
        var lead = await _context.Leads.FindAsync(id);
        if (lead == null)
            return NotFound(new { message = "Lead not found" });

        return Ok(new LeadDto
        {
            Id = lead.Id,
            FullName = lead.FullName,
            Email = lead.Email,
            Organization = lead.Organization,
            InquiryType = lead.InquiryType,
            Message = lead.Message,
            Phone = lead.Phone,
            Priority = lead.Priority,
            Status = lead.Status,
            Notes = lead.Notes,
            CreatedAt = lead.CreatedAt,
            UpdatedAt = lead.UpdatedAt
        });
    }

    /// <summary>
    /// Update lead status and notes (Admin only)
    /// </summary>
    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateLead(Guid id, [FromBody] UpdateLeadDto model)
    {
        var lead = await _context.Leads.FindAsync(id);
        if (lead == null)
            return NotFound(new { message = "Lead not found" });

        if (model.Status.HasValue)
            lead.Status = model.Status.Value;

        if (model.Notes != null)
            lead.Notes = model.Notes;

        lead.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        _logger.LogInformation("Lead updated: {LeadId}, Status: {Status}", id, lead.Status);

        return Ok(new { message = "Lead updated successfully" });
    }

    /// <summary>
    /// Calculate lead priority based on email domain and inquiry type
    /// </summary>
    private static LeadPriority CalculateLeadPriority(string email, InquiryType inquiryType)
    {
        var emailLower = email.ToLower();

        // Critical: .mil or .gov email domains
        if (emailLower.EndsWith(".mil") || emailLower.EndsWith(".gov"))
        {
            return LeadPriority.Critical;
        }

        // High: DoD/Federal or Investor inquiry types
        if (inquiryType == InquiryType.DoDFederal || inquiryType == InquiryType.Investor)
        {
            return LeadPriority.High;
        }

        // Medium: State/Local inquiries
        if (inquiryType == InquiryType.StateLocal)
        {
            return LeadPriority.Medium;
        }

        // Standard: All others
        return LeadPriority.Standard;
    }
}

public class UpdateLeadDto
{
    public LeadStatus? Status { get; set; }
    public string? Notes { get; set; }
}
