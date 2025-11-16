import type { ReactNode } from 'react';
import type { FeatureOptionId } from '../constants';
import type { TooltipImage } from '@/components/ui/Tooltip';

export interface ActionButtonConfig {
  text: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  customComponent?: ReactNode; // Custom action component (e.g., GenerateButton)
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
  placeholder?: string; // Feature-specific placeholder for prompt input
  showAddButton?: boolean; // Whether to show the add button (defaults to false)
  tooltip?: TooltipConfig;
  addButtonTooltip?: TooltipConfig;
}

