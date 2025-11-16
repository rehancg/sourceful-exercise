import { Suspense } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { PromptBox, PromptBoxFallback } from "@/components/prompt-box";

export default function LandingPage() {
  return (
    <div className="flex flex-col md:gap-12 gap-4 md:pt-18">
      <HeroSection />
      <div className="w-full max-w-5xl mx-auto">
        <Suspense fallback={<PromptBoxFallback />}>
          <PromptBox />
        </Suspense>
      </div>
      <div className="md:pb-24"></div>
    </div>
  );
}
