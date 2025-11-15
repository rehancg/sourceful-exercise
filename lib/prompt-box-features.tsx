import type { ReactNode } from 'react';
import type { FeatureOptionId } from './constants';
import type { TooltipImage } from '@/components/ui/Tooltip';

export interface ActionButtonConfig {
  text: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  customComponent?: 'generate'; // Custom component type (e.g., 'generate' for GenerateButton)
}

export interface TooltipConfig {
  title: string;
  description?: string;
  image?: TooltipImage;
  variant?: 'text' | 'image';
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface FeatureOption {
  id: FeatureOptionId;
  label: string;
  icon: ReactNode;
  isNew?: boolean;
  comingSoon?: boolean;
  actionButton?: ActionButtonConfig; // Legacy - use guestActionButton or userActionButton instead
  guestActionButton?: ActionButtonConfig; // For non-authenticated users
  userActionButton?: ActionButtonConfig; // For authenticated users
  infoMessage?: string;
  tooltip?: TooltipConfig;
  addButtonTooltip?: TooltipConfig;
}

export const PROMPT_BOX_FEATURES: FeatureOption[] = [
  {
    id: 'ai-imagery',
    label: 'Create image',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    isNew: true,
    guestActionButton: {
      text: 'Start for free',
      leftIcon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    userActionButton: {
      text: 'Generate',
      leftIcon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      customComponent: 'generate', // Use GenerateButton for authenticated users
    },
    tooltip: {
      title: 'Create image',
      description: 'Create AI imagery using state-of-the-art image models.',
      variant: 'image',
      image: { src: '/images/prompt-create-image.webp', alt: 'Prompt Create Image' },
      position: 'bottom',
    },
    addButtonTooltip: {
      title: 'Add files',
      description: 'Upload images, documents, or other files to enhance your prompt.',
      variant: 'text',
      position: 'bottom',
    },
  },
  {
    id: 'packaging-design',
    label: 'Packaging design',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    tooltip: {
      title: 'Packaging design',
      description: 'Design professional packaging for your products with AI-powered tools.',
      variant: 'text',
      position: 'bottom',
    },
  },
  {
    id: 'logo-design',
    label: 'Logo design',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    isNew: true,
  },
  {
    id: 'edit-image',
    label: 'Edit image',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: 'ai-photoshoot',
    label: 'AI Photoshoot',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    isNew: true,
  },
  {
    id: 'brand-moodboard',
    label: 'Brand moodb',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8.5c.5 0 1-.1 1.5-.3" />
      </svg>
    ),
    isNew: true,
    infoMessage: 'Click start moodboard brief to add your brand and style details.',
    actionButton: {
      text: 'Start moodboard brief',
      rightIcon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      ),
    },
  },
  {
    id: 'social-ads',
    label: 'Social ads',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3v18m8-18v18" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 12h16" />
      </svg>
    ),
    comingSoon: true,
  },
  {
    id: 'product-mockups',
    label: 'Product mockups',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v10m8-5l-8 5-8-5" />
      </svg>
    ),
    isNew: true,
  },
  {
    id: 'cards-posters',
    label: 'Cards & posters',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 12h16M4 16h8" />
      </svg>
    ),
    isNew: true,
  }
] as const;

