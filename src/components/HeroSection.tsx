import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ContactFormModal } from './ContactFormModal';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Background mesh glow effect */}
      <div className="absolute inset-0 bg-mesh-glow" />
      
      {/* Vertical ground-to-air connection gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-cyan-950/20" />
      
      {/* Animated mesh network visual placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-6xl mx-auto relative">
          {/* Visual Placeholder: Ground to Air Mesh */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-full h-96 md:h-[500px] bg-zinc-800/50 rounded-lg border border-cyan-500/20 flex items-center justify-center">
              <span className="text-zinc-500 text-sm md:text-base font-mono text-center px-4">
                [Visual Placeholder: Glowing Blue Mesh Network Connecting Ground Operators to Autonomous Drones]
              </span>
            </div>
          </div>
          
          {/* Ground-level nodes */}
          <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-100 shadow-lg shadow-cyan-400/50" />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200 shadow-lg shadow-cyan-400/50" />
          
          {/* Aerial nodes (higher position) */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-cyan-300 rounded-full animate-pulse shadow-xl shadow-cyan-400/60" />
          <div className="absolute top-1/5 right-1/3 w-3 h-3 bg-cyan-300 rounded-full animate-pulse delay-150 shadow-lg shadow-cyan-400/50" />
          
          {/* Connection lines (implied vertical mesh) */}
          <div className="absolute top-1/4 left-1/3 w-px h-32 bg-gradient-to-b from-cyan-400/50 to-transparent" />
          <div className="absolute top-1/4 right-1/3 w-px h-24 bg-gradient-to-b from-cyan-400/50 to-transparent" />
        </div>
      </div>
      
      {/* Main content - Centered vertically */}
      <div className="relative z-10 flex-1 flex items-center justify-center container mx-auto px-4 md:px-8">
        <div className="text-center">
          {/* Company badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-zinc-900/80 border border-zinc-700 rounded-full">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-zinc-400">
              Altan Dynamics
            </span>
          </div>
          
          {/* Main headline - Centered */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight text-zinc-100 mb-8 leading-tight max-w-5xl mx-auto">
            Unified Sensor Grids
            <br />
            <span className="text-cyan-400">For Hostile Environments.</span>
          </h1>
          
          {/* CTA Button - Below H1 */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold uppercase tracking-wide text-sm md:text-base rounded transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            Request Platform Briefing
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Subhead - Anchored at absolute bottom */}
      <div className="relative z-10 pb-8 md:pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-lg md:text-xl text-zinc-400 text-center max-w-3xl mx-auto leading-relaxed">
            Driving autonomous sensor nodes with{' '}
            <span className="text-cyan-400 font-semibold">Orto AI</span>{' '}
            to create inescapable, multi-domain detection meshes.
          </p>
          
          {/* Scroll indicator */}
          <div className="mt-6 flex flex-col items-center gap-2 text-zinc-500">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
