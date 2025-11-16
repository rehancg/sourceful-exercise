import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

export function DesktopNavigation() {
  const navLinkBase = "font-semibold transition-colors";
  const navLinkStyles = "text-[var(--color-text-secondary-light)] hover:text-[var(--color-text-primary-light)]";

  return (
    <nav 
      className="hidden lg:flex items-center gap-6"
      aria-label="Main navigation"
    >
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={cn(navLinkBase, navLinkStyles, "focus:outline-none focus:ring-1  p-2 rounded")}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

