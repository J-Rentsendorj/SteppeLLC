import { Network, Radio, Cpu } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative p-6 md:p-8 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-cyan-500/30 transition-all duration-300">
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

const FeaturesSection = () => {
  const features = [
    {
      icon: <Network className="w-7 h-7 md:w-8 md:h-8" />,
      title: 'Multi-Domain Mesh Triangulation',
      description: 'The LPD mesh synchronizes ground and aerial nodes to provide real-time friendly force tracking and blue force awareness at the tactical edge, while simultaneously aggregating sensor data into a unified common operating picture for command-level situational awareness and decision superiority.',
    },
    {
      icon: <Radio className="w-7 h-7 md:w-8 md:h-8" />,
      title: 'Multi-Modal Sensor Fusion',
      description: 'Every node—ground or air—fuses high-fidelity acoustic signatures with wide-band RF sniffing, detecting communications and drone control links simultaneously with physical sound.',
    },
    {
      icon: <Cpu className="w-7 h-7 md:w-8 md:h-8" />,
      title: 'Orto AI & Adaptable Libraries',
      description: 'Orto AI running at the edge utilizes mission-specific libraries to identify critical signatures. Confirmed threats trigger immediate, localized audible alerts (the "3 Ds") to the headset alongside instantaneous visual threat-pinning on ATAK/EUD tactical displays, providing operators with precise geospatial threat location overlays.',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-zinc-950">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/20 to-zinc-950" />
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-4 block">
            Technical Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-100">
            Three Pillars of{' '}
            <span className="text-cyan-400">Tactical Advantage</span>
          </h2>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        {/* Bottom decorative element */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <div className="w-2 h-2 bg-cyan-500 rounded-full" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
