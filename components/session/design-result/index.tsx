import { FeatureOptionId } from "@/lib/constants";
import { FeatureResultDisplay } from "./type";
import { cn } from "@/lib/utils";

interface DesignResultProps {
  featureId: FeatureOptionId;
  date: Date;
  results: unknown[];
  onRefine?: () => void;
  className?: string;
}

export function DesignResult({
  featureId,
  date,
  results,
  onRefine,
  className,
}: DesignResultProps) {

  // Format date as "Nov 12, 2025 21:15"
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const dateTimeString = `${formattedDate} ${formattedTime}`;

  return (
    <div className={cn("relative flex justify-start w-full", className)}>
      <div className="w-full">
        {/* Date on Top Left - Outside Container */}
        <div className="absolute -top-6 left-0">
          <span className="text-sm text-gray-500">{dateTimeString}</span>
        </div>

        <div
          className={cn("rounded-2xl p-4 hover:bg-gray-100", className)}
        >
          <FeatureResultDisplay featureId={featureId} results={results} />
        </div>
      </div>
    </div>
  );
}
