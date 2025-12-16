using SendGrid;
using SendGrid.Helpers.Mail;

namespace AltanDynamics.Api.Services;

/// <summary>
/// SendGrid implementation of email service
/// </summary>
public class SendGridEmailService : IEmailService
{
    private readonly ISendGridClient _sendGridClient;
    private readonly IConfiguration _configuration;
    private readonly ILogger<SendGridEmailService> _logger;

    public SendGridEmailService(
        ISendGridClient sendGridClient,
        IConfiguration configuration,
        ILogger<SendGridEmailService> logger)
    {
        _sendGridClient = sendGridClient;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendLeadNotificationAsync(
        string leadName,
        string leadEmail,
        string organization,
        string inquiryType,
        string message,
        string priority,
        string? phone = null)
    {
        try
        {
            var fromEmail = _configuration["Email:FromEmail"] ?? "noreply@altandynamics.com";
            var fromName = _configuration["Email:FromName"] ?? "Altan Dynamics";
            var toEmail = _configuration["Email:NotificationEmail"] ?? fromEmail;

            var from = new EmailAddress(fromEmail, fromName);
            var to = new EmailAddress(toEmail);
            
            var subject = $"🚨 New {priority} Lead: {inquiryType} - {organization}";

            // Create HTML email body
            var htmlContent = $@"
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }}
        .content {{ background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }}
        .field {{ margin-bottom: 15px; }}
        .label {{ font-weight: bold; color: #374151; }}
        .value {{ color: #1f2937; margin-top: 5px; }}
        .priority-critical {{ color: #dc2626; font-weight: bold; }}
        .priority-high {{ color: #ea580c; font-weight: bold; }}
        .priority-medium {{ color: #ca8a04; font-weight: bold; }}
        .priority-standard {{ color: #059669; font-weight: bold; }}
        .footer {{ background: #111827; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }}
        .message-box {{ background: white; padding: 15px; border-left: 4px solid #0891b2; margin: 20px 0; border-radius: 4px; }}
    </style>
</head>
<body>
    <div class=""container"">
        <div class=""header"">
            <h1>🎯 New Lead Submission</h1>
            <p style=""margin: 0; font-size: 18px;"">Priority: <span class=""priority-{priority.ToLower()}"">{priority.ToUpper()}</span></p>
        </div>
        
        <div class=""content"">
            <div class=""field"">
                <div class=""label"">👤 Name:</div>
                <div class=""value"">{leadName}</div>
            </div>
            
            <div class=""field"">
                <div class=""label"">📧 Email:</div>
                <div class=""value""><a href=""mailto:{leadEmail}"">{leadEmail}</a></div>
            </div>
            
            <div class=""field"">
                <div class=""label"">🏢 Organization:</div>
                <div class=""value"">{organization}</div>
            </div>
            
            <div class=""field"">
                <div class=""label"">📋 Inquiry Type:</div>
                <div class=""value"">{inquiryType}</div>
            </div>
            
            {(phone != null ? $@"
            <div class=""field"">
                <div class=""label"">📱 Phone:</div>
                <div class=""value"">{phone}</div>
            </div>
            " : "")}
            
            <div class=""field"">
                <div class=""label"">💬 Message:</div>
                <div class=""message-box"">{message.Replace("\n", "<br>")}</div>
            </div>
            
            <div class=""field"">
                <div class=""label"">⏰ Received:</div>
                <div class=""value"">{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC</div>
            </div>
        </div>
        
        <div class=""footer"">
            <p><strong>Altan Dynamics</strong> - Defense Technology Platform</p>
            <p>Powered by Orto AI | Securing Critical Infrastructure</p>
        </div>
    </div>
</body>
</html>";

            // Create plain text version
            var plainTextContent = $@"
NEW LEAD SUBMISSION
Priority: {priority.ToUpper()}

Name: {leadName}
Email: {leadEmail}
Organization: {organization}
Inquiry Type: {inquiryType}
{(phone != null ? $"Phone: {phone}\n" : "")}
Message:
{message}

Received: {DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} UTC

---
Altan Dynamics - Defense Technology Platform
";

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            // Add reply-to with lead's email
            msg.ReplyTo = new EmailAddress(leadEmail, leadName);

            var response = await _sendGridClient.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Lead notification email sent successfully to {Email} for lead: {LeadName}", 
                    toEmail, leadName);
            }
            else
            {
                var body = await response.Body.ReadAsStringAsync();
                _logger.LogError("Failed to send lead notification email. Status: {Status}, Body: {Body}", 
                    response.StatusCode, body);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception occurred while sending lead notification email");
            // Don't throw - we don't want email failures to block lead creation
        }
    }

    public async Task<bool> SendTestEmailAsync(string toEmail)
    {
        try
        {
            var fromEmail = _configuration["Email:FromEmail"] ?? "noreply@altandynamics.com";
            var fromName = _configuration["Email:FromName"] ?? "Altan Dynamics";

            var from = new EmailAddress(fromEmail, fromName);
            var to = new EmailAddress(toEmail);
            
            var subject = "✅ SendGrid Test - Altan Dynamics";
            var plainTextContent = "This is a test email from Altan Dynamics. If you received this, SendGrid is configured correctly!";
            var htmlContent = @"
<html>
<body style='font-family: Arial, sans-serif;'>
    <h2 style='color: #0891b2;'>✅ SendGrid Test Successful!</h2>
    <p>This is a test email from <strong>Altan Dynamics</strong>.</p>
    <p>If you received this, your SendGrid configuration is working correctly!</p>
    <hr>
    <p style='color: #666; font-size: 12px;'>Sent at: " + DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss") + @" UTC</p>
</body>
</html>";

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await _sendGridClient.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Test email sent successfully to {Email}", toEmail);
                return true;
            }
            else
            {
                var body = await response.Body.ReadAsStringAsync();
                _logger.LogError("Failed to send test email. Status: {Status}, Body: {Body}", 
                    response.StatusCode, body);
                return false;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception occurred while sending test email");
            return false;
        }
    }
}
