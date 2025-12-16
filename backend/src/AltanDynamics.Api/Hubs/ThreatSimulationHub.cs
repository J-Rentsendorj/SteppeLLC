using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace AltanDynamics.Api.Hubs;

[Authorize]
public class ThreatSimulationHub : Hub
{
    private readonly ILogger<ThreatSimulationHub> _logger;
    private static readonly Random _random = new();

    public ThreatSimulationHub(ILogger<ThreatSimulationHub> logger)
    {
        _logger = logger;
    }

    public override async Task OnConnectedAsync()
    {
        _logger.LogInformation("Client connected to ThreatSimulationHub: {ConnectionId}", Context.ConnectionId);
        await Clients.Caller.SendAsync("Connected", new { message = "Connected to Orto AI Threat Simulation" });
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        _logger.LogInformation("Client disconnected from ThreatSimulationHub: {ConnectionId}", Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }

    /// <summary>
    /// Start receiving simulated threat data
    /// </summary>
    public async Task StartSimulation()
    {
        _logger.LogInformation("Simulation started for connection: {ConnectionId}", Context.ConnectionId);
        await Clients.Caller.SendAsync("SimulationStarted", new { message = "Threat detection simulation initiated" });
    }

    /// <summary>
    /// Stop receiving simulated threat data
    /// </summary>
    public async Task StopSimulation()
    {
        _logger.LogInformation("Simulation stopped for connection: {ConnectionId}", Context.ConnectionId);
        await Clients.Caller.SendAsync("SimulationStopped", new { message = "Threat detection simulation stopped" });
    }

    /// <summary>
    /// Generate simulated threat detection data
    /// </summary>
    public static ThreatData GenerateThreatData()
    {
        var threatTypes = new[] { "LSS Drone", "RF Signature", "Acoustic Anomaly", "Unknown UAS" };
        var directions = new[] { "12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00" };
        
        return new ThreatData
        {
            Id = Guid.NewGuid().ToString(),
            Type = threatTypes[_random.Next(threatTypes.Length)],
            Description = $"Detected {threatTypes[_random.Next(threatTypes.Length)]} signature",
            Direction = directions[_random.Next(directions.Length)],
            Distance = $"{_random.Next(50, 500)}m",
            Confidence = _random.Next(70, 100),
            Latitude = 34.0522 + (_random.NextDouble() - 0.5) * 0.01, // Simulated coordinates
            Longitude = -118.2437 + (_random.NextDouble() - 0.5) * 0.01,
            Timestamp = DateTime.UtcNow,
            NodeId = $"NODE-{_random.Next(1, 6):D2}",
            IsThreat = _random.Next(100) > 20 // 80% threat, 20% friendly
        };
    }

    /// <summary>
    /// Generate simulated node status
    /// </summary>
    public static NodeStatus GenerateNodeStatus(int nodeId)
    {
        return new NodeStatus
        {
            NodeId = $"NODE-{nodeId:D2}",
            Type = nodeId <= 3 ? "Ground" : "Aerial",
            Status = _random.Next(100) > 5 ? "Online" : "Offline", // 95% online
            BatteryLevel = _random.Next(20, 100),
            SignalStrength = _random.Next(60, 100),
            LastPing = DateTime.UtcNow.AddSeconds(-_random.Next(1, 10)),
            Latitude = 34.0522 + (_random.NextDouble() - 0.5) * 0.02,
            Longitude = -118.2437 + (_random.NextDouble() - 0.5) * 0.02
        };
    }
}

public class ThreatData
{
    public string Id { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Direction { get; set; } = string.Empty;
    public string Distance { get; set; } = string.Empty;
    public int Confidence { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime Timestamp { get; set; }
    public string NodeId { get; set; } = string.Empty;
    public bool IsThreat { get; set; }
}

public class NodeStatus
{
    public string NodeId { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int BatteryLevel { get; set; }
    public int SignalStrength { get; set; }
    public DateTime LastPing { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
