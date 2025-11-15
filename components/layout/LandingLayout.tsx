import { LandingHeader } from '@/components/landing/LandingHeader';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-r-violet-blue-green-subtle text-[var(--color-text-primary-light)]">
      <LandingHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

