'use client';

import { DesignActionInput } from "./design-input";
import { DesignResult } from "./design-result";
import type { AiImageryResultItem } from "./design-result/type";

export function Session() {
  const demoRequests = [
    {
      id: '1',
      featureId: 'ai-imagery' as const,
      imageUrl: 'https://cdn.sourceful.com/images/v1/e7fa98b8-ff63-4353-91d1-3f2782694480.webp?b=spring-user-assets-prod&expiry=1764547200&w=400&h=400&t=true&signature=9PdDL20P8NP2sMnm8oyHPRaBZmWEQEHEOwhRDFbt90E',
      date: new Date('2025-11-14T21:23:00'),
      prompt: 'Create a playful, cozy, vintage-style café advertisement for Bubble Bee, a bubble tea and coffee café. Feature the uploaded logo prominently in the design. Set the scene with a rustic wooden table topped with colorful bubble tea drinks, whimsical honey jars, and playful elements like cute bee-shaped stirrers and quirky mugs. The café atmosphere should feel warm and lively, with soft lighting, vintage décor, cozy mismatched seating, and touches of fun—like hand-drawn doodles or playful signage in the background. Use warm tones such as honey yellow, cream, and brown, and add pops of pastel colors for a cheerful vibe. The composition should feel inviting, nostalgic, and Instagram-worthy, with a gentle background blur and a realistic, handcrafted, joyful feel that appeals to young adults who love aesthetic, playful cafés.',
    }
  ];

  const handleRemix = (id: string) => {
    console.log('Remix clicked for request:', id);
  };

  const handleRefine = () => {
    console.log('Refine clicked');
  };

  const handleLike = (id: string) => {
    console.log('Like clicked for result:', id);
  };

  const handleImageClick = (id: string) => {
    console.log('Image clicked for result:', id);
  };

  // Demo results data for AI Imagery
  const demoResults: AiImageryResultItem[] = [
    {
      id: 'result-1',
      imageUrl: 'https://cdn.sourceful.com/images/v1/e7fa98b8-ff63-4353-91d1-3f2782694480.webp?b=spring-user-assets-prod&expiry=1764547200&w=400&h=400&t=true&signature=9PdDL20P8NP2sMnm8oyHPRaBZmWEQEHEOwhRDFbt90E',
      isLiked: false,
      onLike: handleLike,
      onImageClick: handleImageClick,
    },
    {
      id: 'result-2',
      imageUrl: 'https://cdn.sourceful.com/images/v1/e7fa98b8-ff63-4353-91d1-3f2782694480.webp?b=spring-user-assets-prod&expiry=1764547200&w=400&h=400&t=true&signature=9PdDL20P8NP2sMnm8oyHPRaBZmWEQEHEOwhRDFbt90E',
      isLiked: true,
      onLike: handleLike,
      onImageClick: handleImageClick,
    },
  ];

  return (
    <div className="bg-white min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Session Requests</h1>
          <p className="text-gray-600">
            View and manage your AI generation requests
          </p>
        </div>

        {demoRequests.map((request) => (
          <div key={request.id} className="space-y-6 mt-8">
            {/* User Input - Right Aligned */}
            <DesignActionInput
              featureId={request.featureId}
              imageUrl={request.imageUrl}
              date={request.date}
              prompt={request.prompt}
              onRemix={() => handleRemix(request.id)}
            />
            
            {/* AI Results - Left Aligned */}
            {request.featureId === 'ai-imagery' && (
              <DesignResult
                featureId={request.featureId}
                date={request.date}
                results={demoResults}
                onRefine={handleRefine}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

