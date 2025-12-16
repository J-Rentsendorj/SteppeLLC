import { AlertTriangle } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-black">
      {/* Darker overlay for claustrophobic feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black" />
      
      {/* Threat accent glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-amber-950/10" />
      
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-amber-500">
              Critical Vulnerability
            </span>
          </div>
          
          {/* Section heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-100 mb-8">
            The Sensor Gap{' '}
            <span className="text-red-500">at the Edge.</span>
          </h2>
          
          {/* Body content */}
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              Operators in high-stakes environments are currently{' '}
              <span className="text-red-400 font-semibold">deaf and blind</span>{' '}
              to modern threats.
            </p>
            
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              Adversaries and bad actors rely on{' '}
              <span className="text-amber-400 font-semibold">low-slow-small (LSS) drones</span>{' '}
              and complex RF signatures that evade traditional radar. Relying solely on human 
              senses in saturated environments creates{' '}
              <span className="text-zinc-200">cognitive overload</span> and{' '}
              <span className="text-red-400 font-semibold">fatal delays</span>{' '}
              in reaction time.
            </p>
          </div>
          
          {/* Visual stats/emphasis */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-900/50 border border-red-500/20 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">0m</div>
              <div className="text-sm text-zinc-400 uppercase tracking-wide">
                Current Detection Range for LSS Threats
              </div>
            </div>
            <div className="p-6 bg-zinc-900/50 border border-amber-500/20 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">5-8s</div>
              <div className="text-sm text-zinc-400 uppercase tracking-wide">
                Human Auditory Reaction Delay
              </div>
            </div>
            <div className="p-6 bg-zinc-900/50 border border-red-500/20 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">100%</div>
              <div className="text-sm text-zinc-400 uppercase tracking-wide">
                Cognitive Load in Saturated Environments
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
};

export default ProblemSection;
