import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

export function DesktopNavigation() {
  const navLinkBase = "font-medium transition-colors";
  const navLinkStyles = "text-[var(--color-text-secondary-light)] hover:text-[var(--color-text-primary-light)]";

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={cn(navLinkBase, navLinkStyles)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

