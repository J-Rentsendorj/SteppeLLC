namespace AltanDynamics.Api.Services;

/// <summary>
/// Email service interface for sending notifications
/// </summary>
public interface IEmailService
{
    /// <summary>
    /// Send a lead notification email
    /// </summary>
    Task SendLeadNotificationAsync(
        string leadName,
        string leadEmail,
        string organization,
        string inquiryType,
        string message,
        string priority,
        string? phone = null);

    /// <summary>
    /// Send a test email
    /// </summary>
    Task<bool> SendTestEmailAsync(string toEmail);
}
