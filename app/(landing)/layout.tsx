import { LandingLayout } from '@/components/layout/LandingLayout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LandingLayout>{children}</LandingLayout>;
}

