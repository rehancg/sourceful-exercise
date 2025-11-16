import { SideNav } from '@/components/home/SideNav';
import { MobileNav } from '@/components/home/MobileNav';
import { UserHeader } from '@/components/home/UserHeader';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

interface HomeLayoutProps {
  children: React.ReactNode;
  backgroundClassName?: string;
}

export function HomeLayout({ 
  children,
  backgroundClassName = 'bg-gradient-r-violet-blue-green-subtle'
}: HomeLayoutProps) {
  return (
    <ProtectedRoute>
      <div className={`flex min-h-screen ${backgroundClassName} text-[var(--color-text-primary-light)]`}>
        <SideNav />
        <MobileNav />
        <UserHeader />
        <main id="main-content" className="flex-1 lg:ml-20 pt-16 lg:pt-0" tabIndex={-1}>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

