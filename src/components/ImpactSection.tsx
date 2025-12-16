import { XCircle, CheckCircle, AlertTriangle, Volume2, Plane } from 'lucide-react';

const ImpactSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black" />
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-4 block">
            Operational Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-100">
            The Battlefield{' '}
            <span className="text-cyan-400">Transformed</span>
          </h2>
        </div>
        
        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 max-w-5xl mx-auto">
          {/* Status Quo - Left Side */}
          <div className="relative p-8 md:p-12 bg-zinc-950 md:rounded-l-lg md:rounded-r-none rounded-lg border border-red-500/20 md:border-r-0">
            {/* Red glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-transparent md:rounded-l-lg rounded-lg" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-red-500/10 border border-red-500/30 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-zinc-100">
                    Status Quo.
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-red-400">Current Reality</span>
                </div>
              </div>
              
              {/* Content */}
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8">
                Team hears drone hum.{' '}
                <span className="text-zinc-300">Eyes go up.</span>{' '}
                <span className="text-red-400 font-semibold">Momentum stops.</span>{' '}
                Confusion reigns.
              </p>
              
              {/* Visual representation */}
              <div className="h-48 md:h-56 bg-zinc-900/50 border border-red-500/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <AlertTriangle className="w-12 h-12 text-red-500/50 mx-auto mb-3" />
                  <span className="text-zinc-600 text-sm font-mono">
                    [Visual: Confused Team - No Situational Awareness]
                  </span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 p-3 bg-zinc-900/50 border border-red-500/20 rounded">
                  <div className="text-lg font-bold text-red-500">0%</div>
                  <div className="text-xs text-zinc-500">Early Warning</div>
                </div>
                <div className="flex-1 p-3 bg-zinc-900/50 border border-red-500/20 rounded">
                  <div className="text-lg font-bold text-red-500">High</div>
                  <div className="text-xs text-zinc-500">Cognitive Load</div>
                </div>
              </div>
            </div>
            
            {/* Decorative corner */}
            <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-red-500/30" />
          </div>
          
          {/* Altan Reality - Right Side */}
          <div className="relative p-8 md:p-12 bg-zinc-950 md:rounded-r-lg md:rounded-l-none rounded-lg border border-cyan-500/30">
            {/* Blue glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-bl from-cyan-950/20 via-transparent to-transparent md:rounded-r-lg rounded-lg" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-zinc-100">
                    The Altan Reality.
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-cyan-400">With Altan Sensor Grid</span>
                </div>
              </div>
              
              {/* Content */}
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-8">
                Threat detected via RF link.{' '}
                <span className="text-cyan-400 font-semibold">Aerial node autonomously deploys.</span>{' '}
                <span className="text-zinc-300">Operator receives immediate audible bearing and distance to threat.</span>{' '}
                Team acts preemptively.
              </p>
              
              {/* Visual representation */}
              <div className="h-48 md:h-56 bg-zinc-900/50 border border-cyan-500/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <Plane className="w-10 h-10 text-cyan-400/50" />
                    <Volume2 className="w-10 h-10 text-cyan-400/50" />
                  </div>
                  <span className="text-zinc-600 text-sm font-mono">
                    [Visual: Aerial Node + Audible Alert to Operator]
                  </span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 p-3 bg-zinc-900/50 border border-cyan-500/20 rounded">
                  <div className="text-lg font-bold text-cyan-400">100%</div>
                  <div className="text-xs text-zinc-500">Early Warning</div>
                </div>
                <div className="flex-1 p-3 bg-zinc-900/50 border border-cyan-500/20 rounded">
                  <div className="text-lg font-bold text-cyan-400">Minimal</div>
                  <div className="text-xs text-zinc-500">Cognitive Load</div>
                </div>
              </div>
            </div>
            
            {/* Decorative corner */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-cyan-500/30" />
          </div>
        </div>
        
        {/* Center divider line (visible on desktop) */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
      </div>
    </section>
  );
};

export default ImpactSection;
