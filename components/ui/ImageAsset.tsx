import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageAssetProps {
  imageUrl: string;
  alt?: string;
  logoUrl?: string;
  isLiked?: boolean;
  onLike?: () => void;
  onClick?: () => void;
  aspectRatio?: 'square' | 'video' | 'auto';
  className?: string;
  imageClassName?: string;
}

export function ImageAsset({
  imageUrl,
  alt = 'Image',
  logoUrl,
  isLiked = false,
  onLike,
  onClick,
  aspectRatio = 'square',
  className,
  imageClassName,
}: ImageAssetProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: '',
  };

  return (
    <div
      className={cn(
        'relative bg-gray-100',
        onClick && 'cursor-pointer',
        aspectRatioClasses[aspectRatio],
        className
      )}
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={cn('object-cover', imageClassName)}
      />

      {/* Logo Overlay (Top Left) */}
      {logoUrl && (
        <div className="absolute top-2 left-2 z-10">
          <div className="relative w-12 h-12">
            <Image
              src={logoUrl}
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Heart Icon (Top Right) */}
      {onLike && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
          className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <svg
            className={cn(
              'w-5 h-5',
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
            )}
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

