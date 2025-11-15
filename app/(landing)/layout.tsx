import { LandingHeader } from '@/components/landing/LandingHeader';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-r-violet-blue-green-subtle text-[var(--color-text-primary-light)]">
      <LandingHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

