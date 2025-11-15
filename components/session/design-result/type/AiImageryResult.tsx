import { Button } from "@/components/ui/Button";
import { ImageAsset } from "@/components/ui/ImageAsset";

export interface AiImageryResultItem {
  id: string;
  imageUrl: string;
  logoUrl?: string;
  isLiked?: boolean;
  onLike?: (id: string) => void;
  onImageClick?: (id: string) => void;
}

interface AiImageryResultProps {
  results: AiImageryResultItem[];
}

export function AiImageryResult({ results }: AiImageryResultProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        {/* Feature Header */}
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">AI Imagery</h2>
        </div>

        {/* Refine Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => {}}
          leftIcon={
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          }
          text="Refine"
        />
      </div>
      <div
        className="grid gap-8 mt-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        }}
      >
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-colors"
          >
            {/* Image Container */}
            <ImageAsset
              imageUrl={result.imageUrl}
              alt="Generated image"
              logoUrl={result.logoUrl}
              isLiked={result.isLiked}
              onLike={() => result.onLike?.(result.id)}
              onClick={() => result.onImageClick?.(result.id)}
              aspectRatio="square"
            />
          </div>
        ))}
      </div>
    </>
  );
}
