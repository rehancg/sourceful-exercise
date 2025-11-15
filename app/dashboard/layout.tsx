import { DashboardLayout as DashboardLayoutComponent } from '@/components/layout/DashboardLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutComponent backgroundClassName="bg-white">
      {children}
    </DashboardLayoutComponent>
  );
}

