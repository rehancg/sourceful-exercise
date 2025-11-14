import { HeroSection } from "@/components/landing/HeroSection";
import { PromptBox } from "@/components/prompt-box";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <div className="w-full max-w-4xl mx-auto">
        <PromptBox />
      </div>
    </>
  );
}
