import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeaturesSection from './FeaturesSection';

describe('FeaturesSection', () => {
  it('renders the section title correctly', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/Technical Capabilities/i)).toBeInTheDocument();
    expect(screen.getByText(/Three Pillars of/i)).toBeInTheDocument();
    expect(screen.getByText(/Tactical Advantage/i)).toBeInTheDocument();
  });

  it('renders all three feature cards', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/Multi-Domain Mesh Triangulation/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-Modal Sensor Fusion/i)).toBeInTheDocument();
    expect(screen.getByText(/Orto AI & Adaptable Libraries/i)).toBeInTheDocument();
  });

  it('displays friendly force tracking and blue force awareness in mesh description', () => {
    render(<FeaturesSection />);
    
    const meshDescription = screen.getByText(/real-time friendly force tracking/i);
    expect(meshDescription).toBeInTheDocument();
    expect(screen.getByText(/blue force awareness/i)).toBeInTheDocument();
    expect(screen.getByText(/common operating picture/i)).toBeInTheDocument();
  });

  it('displays ATAK visual integration in AI description', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/instantaneous visual threat-pinning on ATAK\/EUD tactical displays/i)).toBeInTheDocument();
    expect(screen.getByText(/precise geospatial threat location overlays/i)).toBeInTheDocument();
  });

  it('displays sensor fusion capabilities', () => {
    render(<FeaturesSection />);
    
    const fusionDescription = screen.getByText(/high-fidelity acoustic signatures/i);
    expect(fusionDescription).toBeInTheDocument();
    expect(screen.getByText(/wide-band RF sniffing/i)).toBeInTheDocument();
  });

  it('mentions the "3 Ds" audible alerts', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/the "3 Ds"/i)).toBeInTheDocument();
  });

  it('renders all feature icons', () => {
    const { container } = render(<FeaturesSection />);
    
    // Check for icon containers (there should be 3)
    const iconContainers = container.querySelectorAll('.text-cyan-400');
    expect(iconContainers.length).toBeGreaterThanOrEqual(3);
  });

  it('displays command-level situational awareness', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/command-level situational awareness/i)).toBeInTheDocument();
    expect(screen.getByText(/decision superiority/i)).toBeInTheDocument();
  });

  it('has proper responsive layout classes', () => {
    const { container } = render(<FeaturesSection />);
    
    // Check for grid layout
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid?.className).toMatch(/lg:grid-cols-3/);
  });

  it('applies hover effects to feature cards', () => {
    const { container } = render(<FeaturesSection />);
    
    // Check for hover transition classes
    const cards = container.querySelectorAll('.group');
    expect(cards.length).toBe(3);
    
    cards.forEach(card => {
      expect(card.className).toMatch(/transition/);
    });
  });

  it('displays decorative bottom element', () => {
    const { container } = render(<FeaturesSection />);
    
    // Check for decorative circle dot
    const decorativeElements = container.querySelectorAll('.bg-cyan-500');
    expect(decorativeElements.length).toBeGreaterThan(0);
  });

  it('mentions tactical edge operations', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/tactical edge/i)).toBeInTheDocument();
  });

  it('describes threat identification process', () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/mission-specific libraries/i)).toBeInTheDocument();
    expect(screen.getByText(/identify critical signatures/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmed threats trigger/i)).toBeInTheDocument();
  });
});
