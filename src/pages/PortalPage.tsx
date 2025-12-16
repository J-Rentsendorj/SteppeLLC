import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Activity, User, LogOut, Shield, Radio, Cpu } from 'lucide-react';

export function PortalPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-zinc-100 uppercase tracking-tight">
            Altan<span className="text-cyan-400">.</span>Dynamics
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-zinc-400 text-sm">
              Welcome, <span className="text-zinc-100">{user?.fullName}</span>
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Investor Portal</h1>
          <p className="text-zinc-400">Access exclusive documentation and live demonstrations of the Altan Sensor Grid platform.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Account Status</p>
                <p className="text-xl font-semibold text-green-400">Approved</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Available Documents</p>
                <p className="text-xl font-semibold text-zinc-100">3</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-zinc-400 text-sm">System Status</p>
                <p className="text-xl font-semibold text-green-400">Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Document Library */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Document Library
              </h2>
              <p className="text-zinc-400 text-sm mt-1">Access investor materials and documentation</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { name: 'Executive Summary', type: 'PDF', category: 'Overview' },
                { name: 'Technical Architecture', type: 'PDF', category: 'Technical' },
                { name: 'Market Analysis', type: 'PDF', category: 'Business' },
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-zinc-100 font-medium">{doc.name}</p>
                      <p className="text-zinc-500 text-xs">{doc.category} • {doc.type}</p>
                    </div>
                  </div>
                  <span className="text-cyan-400 text-sm">View →</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Threat Simulation */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Live Threat Simulation
              </h2>
              <p className="text-zinc-400 text-sm mt-1">Real-time demonstration of Orto AI capabilities</p>
            </div>
            <div className="p-6">
              {/* Simulated Map Area */}
              <div className="aspect-video bg-zinc-800/50 rounded-lg border border-zinc-700 flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute w-full h-px bg-cyan-500/30 top-1/4"></div>
                  <div className="absolute w-full h-px bg-cyan-500/30 top-2/4"></div>
                  <div className="absolute w-full h-px bg-cyan-500/30 top-3/4"></div>
                  <div className="absolute h-full w-px bg-cyan-500/30 left-1/4"></div>
                  <div className="absolute h-full w-px bg-cyan-500/30 left-2/4"></div>
                  <div className="absolute h-full w-px bg-cyan-500/30 left-3/4"></div>
                </div>
                <div className="text-center z-10">
                  <Radio className="w-12 h-12 text-cyan-400 mx-auto mb-3 animate-pulse" />
                  <p className="text-zinc-400 text-sm">Connect to start live simulation</p>
                  <button className="mt-4 px-4 py-2 bg-cyan-500 text-zinc-950 font-medium rounded-lg hover:bg-cyan-400 transition-colors text-sm">
                    Start Simulation
                  </button>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-zinc-800/50 rounded p-3 text-center">
                  <p className="text-zinc-500 text-xs mb-1">Ground Nodes</p>
                  <p className="text-cyan-400 font-mono">3/3</p>
                </div>
                <div className="bg-zinc-800/50 rounded p-3 text-center">
                  <p className="text-zinc-500 text-xs mb-1">Aerial Nodes</p>
                  <p className="text-cyan-400 font-mono">2/2</p>
                </div>
                <div className="bg-zinc-800/50 rounded p-3 text-center">
                  <p className="text-zinc-500 text-xs mb-1">Threats Detected</p>
                  <p className="text-amber-400 font-mono">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">Platform Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-zinc-800/30 rounded-lg">
              <Radio className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-zinc-100 font-semibold mb-2">Multi-Modal Fusion</h3>
              <p className="text-zinc-400 text-sm">Acoustic + RF sensor integration for comprehensive threat detection</p>
            </div>
            <div className="text-center p-6 bg-zinc-800/30 rounded-lg">
              <Cpu className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-zinc-100 font-semibold mb-2">Orto AI Engine</h3>
              <p className="text-zinc-400 text-sm">Edge-deployed AI with mission-specific threat libraries</p>
            </div>
            <div className="text-center p-6 bg-zinc-800/30 rounded-lg">
              <User className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-zinc-100 font-semibold mb-2">3D Alerts</h3>
              <p className="text-zinc-400 text-sm">Description, Direction, Distance delivered to operator</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <p className="text-zinc-500 text-sm">
            © 2025 Altan Dynamics. All information is confidential and proprietary.
          </p>
        </div>
      </footer>
    </div>
  );
}
