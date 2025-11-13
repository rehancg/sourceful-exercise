import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';

export function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      {/* Desktop Action Buttons */}
      <div className="hidden lg:flex items-center gap-2">
        <Button variant="secondary" className="h-auto px-4 py-2">
          Login or sign up
        </Button>
        <Button variant="primary" className="h-auto px-4 py-2">
          Start for free
        </Button>
      </div>

      {/* Mobile Action Buttons */}
      <div className="flex lg:hidden items-center gap-2">
        <IconButton
          size="md"
          variant="ghost"
          aria-label="User account"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </IconButton>
        <Button variant="primary" className="h-auto px-4 py-2 text-sm">
          Start for free
        </Button>
      </div>
    </div>
  );
}

