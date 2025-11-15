'use client';

import { SideNav } from '@/components/home/SideNav';
import { MobileNav } from '@/components/home/MobileNav';
import { UserHeader } from '@/components/home/UserHeader';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

interface DashboardLayoutProps {
  children: React.ReactNode;
  showUserHeader?: boolean;
  backgroundClassName?: string;
}

export function DashboardLayout({ 
  children, 
  showUserHeader = false,
  backgroundClassName = 'bg-white'
}: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className={`flex min-h-screen ${backgroundClassName} text-[var(--color-text-primary-light)]`}>
        <SideNav />
        <MobileNav />
        {showUserHeader && <UserHeader />}
        <main id="main-content" className="flex-1 lg:ml-20 pt-16 lg:pt-0" tabIndex={-1}>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

