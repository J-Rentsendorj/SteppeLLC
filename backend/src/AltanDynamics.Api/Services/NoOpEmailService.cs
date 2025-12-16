namespace AltanDynamics.Api.Services;

/// <summary>
/// No-operation email service for when SendGrid is not configured
/// </summary>
public class NoOpEmailService : IEmailService
{
    private readonly ILogger<NoOpEmailService> _logger;

    public NoOpEmailService(ILogger<NoOpEmailService> logger)
    {
        _logger = logger;
    }

    public Task SendLeadNotificationAsync(
        string leadName,
        string leadEmail,
        string organization,
        string inquiryType,
        string message,
        string priority,
        string? phone = null)
    {
        _logger.LogWarning(
            "⚠️ Email service not configured. Lead notification would have been sent for: {LeadName} ({Priority})",
            leadName, priority);
        
        return Task.CompletedTask;
    }

    public Task<bool> SendTestEmailAsync(string toEmail)
    {
        _logger.LogWarning("⚠️ Email service not configured. Cannot send test email to: {Email}", toEmail);
        return Task.FromResult(false);
    }
}
