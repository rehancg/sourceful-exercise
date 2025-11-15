import Image from 'next/image';

interface AiImageryProps {
  prompt: string;
  imageUrl?: string;
}

export function AiImagery({ prompt, imageUrl }: AiImageryProps) {
  return (
    <div className="mb-4 space-y-4">
      {/* Image Preview */}
      {imageUrl && (
        <div className="relative max-w-[150px] aspect-square rounded-lg overflow-hidden bg-gray-200">
          <Image
            src={imageUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
        </div>
      )}
      
      {/* Prompt Text */}
      <p className="text-sm text-gray-700 leading-relaxed">{prompt}</p>
    </div>
  );
}

