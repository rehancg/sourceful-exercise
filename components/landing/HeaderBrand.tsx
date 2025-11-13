import { Logo } from '@/components/ui/Logo';

export function HeaderBrand() {
  return (
    <div className="flex items-center gap-8">
      <Logo href="/" size="md" showText={true} className="hidden md:flex" />
      <Logo href="/" size="md" showText={false} className="md:hidden" />
    </div>
  );
}

