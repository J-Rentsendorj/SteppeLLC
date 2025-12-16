import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      {/* Subtle tactical grid overlay */}
      <div className="fixed inset-0 bg-tactical-grid pointer-events-none opacity-50" />
      
      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
