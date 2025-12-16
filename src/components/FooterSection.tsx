import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, ArrowRight, TrendingUp } from 'lucide-react';
import { ContactFormModal } from './ContactFormModal';

const FooterSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedType, setPreselectedType] = useState<number>(0);

  const openModal = (type: number) => {
    setPreselectedType(type);
    setIsModalOpen(true);
  };

  return (
    <footer className="relative py-24 md:py-32 bg-black">
      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        preselectedType={preselectedType}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-zinc-950" />
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold uppercase tracking-tight text-zinc-100 mb-4 leading-tight">
            Hostile Environments Demand
            <br />
            <span className="text-cyan-400">Modern Senses.</span>
          </h2>
          
          <p className="text-xl md:text-2xl font-semibold uppercase tracking-wide text-zinc-400 mb-12">
            Equip the Frontline.
          </p>
          
          {/* Split CTA Buttons - Two Primary Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
            {/* Primary CTA 1 - DoD/Federal */}
            <button 
              onClick={() => openModal(0)}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold uppercase tracking-wide text-sm md:text-base rounded transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <Building2 className="w-5 h-5" />
              DoD / Federal Inquiries
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Primary CTA 2 - State & Local */}
            <button 
              onClick={() => openModal(1)}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-transparent border-2 border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 font-bold uppercase tracking-wide text-sm md:text-base rounded transition-all duration-300"
            >
              <Shield className="w-5 h-5" />
              State & Local (LEO/SAR)
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Secondary CTA - Investors */}
          <div className="mb-12">
            <Link 
              to="/register" 
              className="group inline-flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm md:text-base">
                <span className="font-semibold">Accredited Investors & VC Inquiries:</span>{' '}
                <span className="underline underline-offset-4 decoration-zinc-600 group-hover:decoration-cyan-400">
                  Fuel the Future of Defense & Safety
                </span>
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Secondary contact info */}
          <div className="pt-8 border-t border-zinc-800">
            <p className="text-sm text-zinc-500 mb-4">
              For classified inquiries, please contact through appropriate channels.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-zinc-400">
              <span>federal@altandynamics.com</span>
              <span className="hidden md:inline text-zinc-700">|</span>
              <span>statelocal@altandynamics.com</span>
              <span className="hidden md:inline text-zinc-700">|</span>
              <span>invest@altandynamics.com</span>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-zinc-900">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo/Company name */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              <span className="text-sm font-semibold tracking-widest uppercase text-zinc-500">
                Altan Dynamics
              </span>
            </div>
            
            {/* Copyright */}
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} Altan Dynamics, LLC. All rights reserved.
            </p>
            
            {/* Legal links */}
            <div className="flex items-center gap-6 text-xs text-zinc-600">
              <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
