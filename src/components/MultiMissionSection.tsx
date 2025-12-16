import { Shield, Siren, Mountain } from 'lucide-react';

interface MissionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const MissionCard = ({ icon, title, description }: MissionCardProps) => {
  return (
    <div className="group relative p-6 md:p-8 bg-zinc-950/50 border border-zinc-800 rounded-lg hover:border-cyan-500/30 transition-all duration-300">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Icon container */}
        <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center bg-zinc-800 border border-zinc-700 rounded-lg group-hover:border-cyan-500/50 group-hover:bg-zinc-800/80 transition-all duration-300">
          <div className="text-cyan-400">
            {icon}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-zinc-100 mb-4">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

const MultiMissionSection = () => {
  const missions = [
    {
      icon: <Shield className="w-7 h-7 md:w-8 md:h-8" />,
      title: 'Border Security & Interdiction',
      description: 'Rapidly deploy aerial nodes to triangulate RF comms and smuggling drones in remote terrain, providing agents with immediate audible bearing and distance cues.',
    },
    {
      icon: <Siren className="w-7 h-7 md:w-8 md:h-8" />,
      title: 'Law Enforcement (LEO/SWAT)',
      description: 'Provide acoustic triangulation for counter-sniper operations, delivering instantaneous "3D" audible alerts to officers for immediate threat localization during high-risk services.',
    },
    {
      icon: <Mountain className="w-7 h-7 md:w-8 md:h-8" />,
      title: 'Search & Rescue (SAR)',
      description: 'Aerial nodes expand search radius, scanning passively for faint cellular pings or emergency beacons in wilderness environments.',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-zinc-900">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-zinc-900" />
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-6">
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-4 block">
            Dual-Use Capability
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-100 mb-4">
            Beyond the Battlefield:{' '}
            <span className="text-cyan-400">Multi-Mission Capability</span>
          </h2>
        </div>
        
        {/* Subhead - emphasizing retrofit */}
        <p className="text-lg md:text-xl text-zinc-400 text-center max-w-3xl mx-auto mb-16">
          The Altan architecture{' '}
          <span className="text-cyan-400 font-semibold">adapts existing agency hardware</span>{' '}
          to high-risk domestic operations, providing critical situational awareness for{' '}
          <span className="text-zinc-200">homeland security</span> and{' '}
          <span className="text-zinc-200">public safety</span>.
        </p>
        
        {/* Mission grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {missions.map((mission, index) => (
            <MissionCard
              key={index}
              icon={mission.icon}
              title={mission.title}
              description={mission.description}
            />
          ))}
        </div>
        
        {/* Visual placeholder for multi-mission scenarios */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="h-48 md:h-64 bg-zinc-950/50 border border-zinc-800 rounded-lg flex items-center justify-center">
            <div className="text-center px-4">
              <div className="flex items-center justify-center gap-6 mb-4">
                <Shield className="w-8 h-8 text-cyan-400/30" />
                <Siren className="w-8 h-8 text-cyan-400/30" />
                <Mountain className="w-8 h-8 text-cyan-400/30" />
              </div>
              <span className="text-zinc-600 text-sm font-mono">
                [Visual Placeholder: Multi-Mission Deployment Scenarios - Border, Urban, Wilderness]
              </span>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <div className="w-2 h-2 bg-cyan-500 rounded-full" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
      </div>
      
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
};

export default MultiMissionSection;
