import { useRef, useState, useEffect } from 'react';
import { FeatureOption } from './FeatureOption';
import { PROMPT_BOX_FEATURES } from '@/lib/prompt-box-features';
import { FeatureOptionId } from '@/lib/constants';
import { IconButton } from '@/components/ui/IconButton';

interface FeatureOptionsRowProps {
  selectedFeature?: FeatureOptionId;
  onFeatureSelect?: (featureId: FeatureOptionId) => void;
}

export function FeatureOptionsRow({ 
  selectedFeature = 'create-image',
  onFeatureSelect 
}: FeatureOptionsRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<Map<FeatureOptionId, HTMLButtonElement>>(new Map());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const handleScroll = () => {
    checkScrollability();
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const scrollToFeature = (featureId: FeatureOptionId) => {
    const featureElement = featureRefs.current.get(featureId);
    const container = scrollContainerRef.current;
    
    if (featureElement && container) {
      // Get positions relative to the container
      const containerRect = container.getBoundingClientRect();
      const featureRect = featureElement.getBoundingClientRect();
      
      // Calculate the current scroll position
      const currentScrollLeft = container.scrollLeft;
      
      // Calculate the feature's position relative to the container's content
      const featureLeftRelative = featureRect.left - containerRect.left + currentScrollLeft;
      const featureWidth = featureElement.offsetWidth;
      const containerWidth = container.clientWidth;
      
      // Calculate the center position of the feature
      const featureCenter = featureLeftRelative + featureWidth / 2;
      
      // Calculate the desired scroll position to center the feature
      const targetScrollLeft = featureCenter - containerWidth / 2;
      
      // Scroll to center the feature
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScrollability();
    const resizeObserver = new ResizeObserver(checkScrollability);
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (selectedFeature) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToFeature(selectedFeature);
      }, 100);
    }
  }, [selectedFeature]);

  return (
    <div className="relative mb-6">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2"
      >
        {PROMPT_BOX_FEATURES.map((feature) => (
          <FeatureOption
            key={feature.id}
            feature={feature}
            isSelected={selectedFeature === feature.id}
            onClick={() => onFeatureSelect?.(feature.id)}
            ref={(el) => {
              if (el) {
                featureRefs.current.set(feature.id, el);
              } else {
                featureRefs.current.delete(feature.id);
              }
            }}
          />
        ))}
      </div>
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center justify-start pointer-events-none pl-2">
          <IconButton
            onClick={scrollLeft}
            size="md"
            variant="default"
            className="flex-shrink-0 pointer-events-auto bg-white shadow-md hover:bg-gray-50 z-10"
            aria-label="Scroll left to see previous options"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </IconButton>
        </div>
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end pointer-events-none pr-2">
          <IconButton
            onClick={scrollRight}
            size="md"
            variant="default"
            className="flex-shrink-0 pointer-events-auto bg-white shadow-md hover:bg-gray-50 z-10"
            aria-label="Scroll right to see more options"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </IconButton>
        </div>
      )}
    </div>
  );
}

