using AltanDynamics.Api.Controllers;
using AltanDynamics.Api.Models.DTOs.Lead;
using AltanDynamics.Api.Models.Entities;
using AltanDynamics.Api.Models.Enums;
using AltanDynamics.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace AltanDynamics.Api.Tests.Controllers;

public class LeadsControllerTests
{
    private ApplicationDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        
        return new ApplicationDbContext(options);
    }

    private ILogger<LeadsController> GetMockLogger()
    {
        return new Mock<ILogger<LeadsController>>().Object;
    }

    [Fact]
    public async Task CreateLead_WithMilEmail_AssignsCriticalPriority()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var controller = new LeadsController(context, logger);
        
        var createLeadDto = new CreateLeadDto
        {
            FullName = "John Doe",
            Email = "john.doe@us.mil",
            Organization = "US Army",
            InquiryType = InquiryType.DoDFederal,
            Message = "Interested in S.E.N.S.E. platform"
        };

        // Act
        var result = await controller.CreateLead(createLeadDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var leadDto = Assert.IsType<LeadDto>(okResult.Value);
        Assert.Equal(LeadPriority.Critical, leadDto.Priority);
        Assert.Equal(LeadStatus.New, leadDto.Status);
    }

    [Fact]
    public async Task CreateLead_WithGovEmail_AssignsCriticalPriority()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var controller = new LeadsController(context, logger);
        
        var createLeadDto = new CreateLeadDto
        {
            FullName = "Jane Smith",
            Email = "jane.smith@dhs.gov",
            Organization = "Department of Homeland Security",
            InquiryType = InquiryType.StateLocal,
            Message = "Border security application inquiry"
        };

        // Act
        var result = await controller.CreateLead(createLeadDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var leadDto = Assert.IsType<LeadDto>(okResult.Value);
        Assert.Equal(LeadPriority.Critical, leadDto.Priority);
    }

    [Fact]
    public async Task CreateLead_WithDodFederalInquiry_AssignsHighPriority()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var controller = new LeadsController(context, logger);
        
        var createLeadDto = new CreateLeadDto
        {
            FullName = "Bob Johnson",
            Email = "bob@contractor.com",
            Organization = "Defense Contractor",
            InquiryType = InquiryType.DoDFederal,
            Message = "Defense platform integration"
        };

        // Act
        var result = await controller.CreateLead(createLeadDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var leadDto = Assert.IsType<LeadDto>(okResult.Value);
        Assert.Equal(LeadPriority.High, leadDto.Priority);
    }

    [Fact]
    public async Task CreateLead_WithInvestorInquiry_AssignsHighPriority()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var controller = new LeadsController(context, logger);
        
        var createLeadDto = new CreateLeadDto
        {
            FullName = "Sarah Investor",
            Email = "sarah@vc-firm.com",
            Organization = "Tech Ventures Capital",
            InquiryType = InquiryType.Investor,
            Message = "Investment opportunity discussion"
        };

        // Act
        var result = await controller.CreateLead(createLeadDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var leadDto = Assert.IsType<LeadDto>(okResult.Value);
        Assert.Equal(LeadPriority.High, leadDto.Priority);
    }

    [Fact]
    public async Task CreateLead_WithStateLocalInquiry_AssignsMediumPriority()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var controller = new LeadsController(context, logger);
        
        var createLeadDto = new CreateLeadDto
        {
            FullName = "Mike Officer",
            Email = "mike@citypolice.org",
            Organization = "City Police Department",
            InquiryType = InquiryType.StateLocal,
            Message = "SWAT team equipment inquiry"
        };

        // Act
        var result = await controller.CreateLead(createLeadDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var leadDto = Assert.IsType<LeadDto>(okResult.Value);
        Assert.Equal(LeadPriority.Medium, leadDto.Priority);
    }

    [Fact]
    public async Task CreateLead_WithMediaInquiry_AssignsStandardPriority()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var controller = new LeadsController(context, logger);
        
        var createLeadDto = new CreateLeadDto
        {
            FullName = "Reporter Jones",
            Email = "jones@news.com",
            Organization = "Tech News Network",
            InquiryType = InquiryType.Media,
            Message = "Interview request"
        };

        // Act
        var result = await controller.CreateLead(createLeadDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var leadDto = Assert.IsType<LeadDto>(okResult.Value);
        Assert.Equal(LeadPriority.Standard, leadDto.Priority);
    }

    [Fact]
    public async Task GetLeads_ReturnsAllLeads()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        
        // Seed test data
        context.Leads.AddRange(
            new Lead
            {
                Id = Guid.NewGuid(),
                FullName = "Test Lead 1",
                Email = "test1@example.com",
                Organization = "Org 1",
                InquiryType = InquiryType.DoDFederal,
                Message = "Test message 1",
                Priority = LeadPriority.High,
                Status = LeadStatus.New,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Lead
            {
                Id = Guid.NewGuid(),
                FullName = "Test Lead 2",
                Email = "test2@example.com",
                Organization = "Org 2",
                InquiryType = InquiryType.StateLocal,
                Message = "Test message 2",
                Priority = LeadPriority.Medium,
                Status = LeadStatus.New,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        );
        await context.SaveChangesAsync();
        
        var controller = new LeadsController(context, logger);

        // Act
        var result = await controller.GetLeads();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var leads = Assert.IsAssignableFrom<IEnumerable<LeadDto>>(okResult.Value);
        Assert.Equal(2, leads.Count());
    }

    [Fact]
    public async Task GetLead_WithValidId_ReturnsLead()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var leadId = Guid.NewGuid();
        
        context.Leads.Add(new Lead
        {
            Id = leadId,
            FullName = "Test Lead",
            Email = "test@example.com",
            Organization = "Test Org",
            InquiryType = InquiryType.DoDFederal,
            Message = "Test message",
            Priority = LeadPriority.High,
            Status = LeadStatus.New,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });
        await context.SaveChangesAsync();
        
        var controller = new LeadsController(context, logger);

        // Act
        var result = await controller.GetLead(leadId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var leadDto = Assert.IsType<LeadDto>(okResult.Value);
        Assert.Equal(leadId, leadDto.Id);
        Assert.Equal("Test Lead", leadDto.FullName);
    }

    [Fact]
    public async Task GetLead_WithInvalidId_ReturnsNotFound()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var controller = new LeadsController(context, logger);
        var invalidId = Guid.NewGuid();

        // Act
        var result = await controller.GetLead(invalidId);

        // Assert
        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task UpdateLead_WithValidData_UpdatesLead()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var leadId = Guid.NewGuid();
        
        context.Leads.Add(new Lead
        {
            Id = leadId,
            FullName = "Test Lead",
            Email = "test@example.com",
            Organization = "Test Org",
            InquiryType = InquiryType.DoDFederal,
            Message = "Test message",
            Priority = LeadPriority.High,
            Status = LeadStatus.New,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });
        await context.SaveChangesAsync();
        
        var controller = new LeadsController(context, logger);
        var updateDto = new UpdateLeadDto
        {
            Status = LeadStatus.Contacted,
            Notes = "Follow-up scheduled"
        };

        // Act
        var result = await controller.UpdateLead(leadId, updateDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var leadDto = Assert.IsType<LeadDto>(okResult.Value);
        Assert.Equal(LeadStatus.Contacted, leadDto.Status);
        Assert.Equal("Follow-up scheduled", leadDto.Notes);
    }

    [Fact]
    public async Task UpdateLead_WithInvalidId_ReturnsNotFound()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var controller = new LeadsController(context, logger);
        var invalidId = Guid.NewGuid();
        var updateDto = new UpdateLeadDto
        {
            Status = LeadStatus.Contacted,
            Notes = "Test notes"
        };

        // Act
        var result = await controller.UpdateLead(invalidId, updateDto);

        // Assert
        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Theory]
    [InlineData("test@army.mil", LeadPriority.Critical)]
    [InlineData("test@navy.mil", LeadPriority.Critical)]
    [InlineData("test@af.mil", LeadPriority.Critical)]
    [InlineData("test@usmc.mil", LeadPriority.Critical)]
    [InlineData("test@nga.mil", LeadPriority.Critical)]
    [InlineData("test@fbi.gov", LeadPriority.Critical)]
    [InlineData("test@dhs.gov", LeadPriority.Critical)]
    [InlineData("test@state.gov", LeadPriority.Critical)]
    public async Task CreateLead_WithVariousMilGovDomains_AssignsCriticalPriority(
        string email, 
        LeadPriority expectedPriority)
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var logger = GetMockLogger();
        var controller = new LeadsController(context, logger);
        
        var createLeadDto = new CreateLeadDto
        {
            FullName = "Test User",
            Email = email,
            Organization = "Government Agency",
            InquiryType = InquiryType.DoDFederal,
            Message = "Test inquiry"
        };

        // Act
        var result = await controller.CreateLead(createLeadDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var leadDto = Assert.IsType<LeadDto>(okResult.Value);
        Assert.Equal(expectedPriority, leadDto.Priority);
    }
}
