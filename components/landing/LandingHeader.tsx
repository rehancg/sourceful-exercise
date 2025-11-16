import { HeaderBrand } from './HeaderBrand';
import { DesktopNavigation } from './DesktopNavigation';
import { HeaderActions } from './HeaderActions';
import { MobileMenuButton } from './MobileMenuButton';
import { MobileMenuOverlay } from './MobileMenuOverlay';
import { MobileMenuProvider } from './context/MobileMenuProvider';

export function LandingHeader() {  
  return (
    <MobileMenuProvider>
      <LandingHeaderContent />
    </MobileMenuProvider>
  );
}

function LandingHeaderContent() {
  return (
    <header 
        className="w-full max-w-7xl mx-auto py-2 px-4 sm:px-6 md:px-8"
        role="banner"
      >
      <div className="flex justify-between items-center mx-auto">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <MobileMenuButton />
          <HeaderBrand />
          <DesktopNavigation />
        </div>

        {/* Right Side Actions */}
        <HeaderActions />
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay />
    </header>
  );
}
