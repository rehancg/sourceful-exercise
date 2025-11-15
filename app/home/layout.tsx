import { SideNav } from '@/components/layout/SideNav';
import { MobileNav } from '@/components/layout/MobileNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-r-violet-blue-green-subtle text-[var(--color-text-primary-light)]">
      <SideNav />
      <MobileNav />
      <main id="main-content" className="flex-1 lg:ml-20 pt-16 lg:pt-0" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

