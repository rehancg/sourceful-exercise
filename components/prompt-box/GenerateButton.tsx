"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePromptBox } from "./context/PromptBoxContext";
import { Button } from "@/components/ui/Button";
import { Popover } from "@/components/ui/Popover";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

interface GenerateButtonProps {
  className?: string;
}

const IMAGE_COST = 2; // Credits per image
const MAX_IMAGES = 5;

export function GenerateButton({ className }: GenerateButtonProps) {
  const { balance } = useAuth();
  const { onActionClick, prompt } = usePromptBox();
  const [imageCount, setImageCount] = useState(1);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const isPromptFilled = useMemo(() => {
    return prompt.trim().length > 0;
  }, [prompt]);

  const isDisabled = !isPromptFilled;

  // Calculate max images based on balance
  const maxAffordableImages = useMemo(() => {
    return balance !== null
      ? Math.min(Math.floor(balance / IMAGE_COST), MAX_IMAGES)
      : MAX_IMAGES;
  }, [balance]);

  // Ensure selected count doesn't exceed affordable - use derived value
  const safeImageCount = useMemo(() => {
    return Math.min(imageCount, maxAffordableImages || 1);
  }, [imageCount, maxAffordableImages]);

  const totalCost = safeImageCount * IMAGE_COST;

  // Update imageCount if it exceeds the new limit (derived from balance change)
  const displayImageCount =
    imageCount > maxAffordableImages ? maxAffordableImages : imageCount;

  const handleGenerate = () => {
    if (isDisabled) return;
    onActionClick(safeImageCount);
    setIsPopoverOpen(false);
  };

  const imageIcon = (
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
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Image Count Selector */}

      <Popover
        trigger={
          <Tooltip
            title="Number of images"
            description="Select how many images you want to generate (1-5)"
            position="top"
          >
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <span className="text-md font-semibold text-gray-900">
                {displayImageCount}
              </span>
              {imageIcon}
            </button>
          </Tooltip>
        }
        position="bottom"
        align="start"
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        contentClassName="w-64"
      >
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((count) => {
              const canAfford =
                balance !== null ? count * IMAGE_COST <= balance : true;
              const isSelected = displayImageCount === count;
              const isDisabled = !canAfford;

              return (
                <button
                  key={count}
                  onClick={() => {
                    if (!isDisabled) {
                      setImageCount(count);
                      setIsPopoverOpen(false);
                    }
                  }}
                  disabled={isDisabled}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {count}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: count }).map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                      isSelected
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    )}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Popover>

      {/* Generate Button */}
      <Tooltip
        title={isDisabled ? "Enter a prompt to generate" : "Generate images"}
        description={
          isDisabled
            ? "Please enter a description of the image you want to create"
            : `Generate ${displayImageCount} image${
                displayImageCount !== 1 ? "s" : ""
              } for ${totalCost} credits`
        }
        position="top"
      >
        <Button
          variant="primary"
          onClick={handleGenerate}
          disabled={isDisabled || balance! < 2}
          className={cn(
            "flex items-center gap-2 px-6",
            isDisabled && "opacity-50 cursor-not-allowed"
          )}
          leftIcon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          }
          rightIcon={
            <div className="px-3 py-1.5 bg-white text-black rounded-full flex items-center gap-1.5">
              <span className="text-sm text-black font-bold">{totalCost}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="8" cy="8" r="6" />
                <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                <path d="M7 6h1v4" />
                <path d="m16.71 13.88.7.71-2.82 2.82" />
              </svg>
            </div>
          }
        >
          Generate
        </Button>
      </Tooltip>
    </div>
  );
}
