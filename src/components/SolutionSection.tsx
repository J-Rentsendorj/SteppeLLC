import { Zap, Headphones, Plane, Shield, Volume2 } from 'lucide-react';

const SolutionSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-zinc-950 overflow-hidden">
      {/* Blue tech glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-zinc-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan-500/5 blur-3xl rounded-full" />
      
      {/* Data stream lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-cyan-500" />
            <Zap className="w-5 h-5 text-cyan-400" />
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-cyan-400">
              The Solution
            </span>
            <div className="h-px w-12 bg-cyan-500" />
          </div>
          
          {/* Parent Platform - Main heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-center text-zinc-100 mb-4">
            The{' '}
            <span className="text-cyan-400">Altan Sensor Grid.</span>
          </h2>
          
          {/* Parent Platform - Description */}
          <p className="text-lg md:text-xl text-zinc-400 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            A unified, autonomous architecture powered by{' '}
            <span className="text-cyan-400 font-semibold">Orto AI</span>. 
            We integrate adaptable edge processors—primarily helmet-mounted via{' '}
            <span className="text-zinc-200 font-semibold">direct retrofit to existing fielded comms</span>{' '}
            (e.g., 3M Peltor, Ops-Core/Gentex)—with autonomously deployed aerial nodes. 
            This approach maximizes current hardware investments while providing scalable coverage.
          </p>
          
          {/* Two-column layout - Parent Platform Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Visual placeholder */}
            <div>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-lg" />
                
                {/* Placeholder container */}
                <div className="relative h-80 md:h-96 bg-zinc-900 border border-cyan-500/30 rounded-lg flex items-center justify-center overflow-hidden">
                  {/* Tech grid pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }} />
                  </div>
                  
                  {/* Dual hardware icons */}
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center">
                      <Headphones className="w-16 h-16 text-cyan-400/40" />
                      <span className="text-xs text-zinc-600 mt-2">Retrofit Adapter</span>
                    </div>
                    <div className="w-16 h-px bg-gradient-to-r from-cyan-400/50 to-cyan-400/50 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    </div>
                    <div className="flex flex-col items-center">
                      <Plane className="w-16 h-16 text-cyan-400/40" />
                      <span className="text-xs text-zinc-600 mt-2">Aerial Node</span>
                    </div>
                  </div>
                  
                  {/* Placeholder text */}
                  <span className="absolute bottom-4 text-zinc-600 text-xs font-mono text-center px-4">
                    [Visual: Universal Retrofit Adapter + Drone Node Data Link]
                  </span>
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500" />
                </div>
              </div>
            </div>
            
            {/* Key specs */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-zinc-100 mb-4">
                Platform Advantages
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">Retrofit</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wide">Existing Comms Compatible</div>
                </div>
                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">Orto AI</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wide">Edge Intelligence</div>
                </div>
                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">Cost-Effective</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wide">Maximize Investments</div>
                </div>
                <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">Scalable</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wide">Multi-Domain Coverage</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <Shield className="w-6 h-6 text-cyan-400" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>
          
          {/* Military Application Sub-section */}
          <div className="bg-zinc-900/50 border border-cyan-500/20 rounded-lg p-8 md:p-12">
            {/* Military App Label */}
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-cyan-400">
                Military Application
              </span>
            </div>
            
            {/* S.E.N.S.E. Heading */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-zinc-100 mb-2">
              S.E.N.S.E.
            </h3>
            
            {/* Acronym */}
            <p className="text-lg md:text-xl text-zinc-400 mb-4">
              Soldier Enhanced Noise Surveillance Equipment
            </p>
            
            {/* Motto - Distinct styling */}
            <div className="text-xl md:text-2xl text-cyan-400 font-semibold italic mb-8 relative">
              <span className="relative inline-block">
                "DOMINANCE THROUGH AWARENESS."
                <span className="absolute -inset-2 bg-cyan-400/5 blur-lg rounded" />
              </span>
            </div>
            
            {/* Military App Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-base md:text-lg text-zinc-300 leading-relaxed mb-6">
                  S.E.N.S.E. is the combat-specific software configuration of the Altan Grid. 
                  Upon threat verification,{' '}
                  <span className="text-cyan-400 font-semibold">Orto AI delivers individualized audible warnings</span>{' '}
                  directly to the operator's headset.
                </p>
                
                <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                  Providing immediate "3D" situational awareness:{' '}
                  <span className="text-zinc-100 font-semibold">Description</span>,{' '}
                  <span className="text-zinc-100 font-semibold">Direction</span> (relative clock position), and{' '}
                  <span className="text-zinc-100 font-semibold">Distance</span>.
                </p>
              </div>
              
              {/* 3D Awareness Visual */}
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-zinc-800/50 border border-cyan-500/30 rounded-lg">
                    <Volume2 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-cyan-400">Description</div>
                    <div className="text-xs text-zinc-500">What</div>
                  </div>
                  <div className="p-4 bg-zinc-800/50 border border-cyan-500/30 rounded-lg">
                    <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center text-cyan-400 font-bold text-lg">
                      12:00
                    </div>
                    <div className="text-lg font-bold text-cyan-400">Direction</div>
                    <div className="text-xs text-zinc-500">Where</div>
                  </div>
                  <div className="p-4 bg-zinc-800/50 border border-cyan-500/30 rounded-lg">
                    <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center text-cyan-400 font-bold text-lg">
                      50m
                    </div>
                    <div className="text-lg font-bold text-cyan-400">Distance</div>
                    <div className="text-xs text-zinc-500">How Far</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
