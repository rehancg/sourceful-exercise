import type { FeatureOption } from '../types';
import { CreateImageIcon, SparkleIcon } from '@/components/ui/icons';
import { GenerateButton } from '@/components/prompt-box/GenerateButton';

export const aiImageryFeature: FeatureOption = {
  id: 'ai-imagery',
  label: 'Create image',
  icon: <CreateImageIcon />,
  isNew: true,
  placeholder: 'Describe the image you want to create...',
  guestActionButton: {
    text: 'Start for free',
    leftIcon: <SparkleIcon />,
  },
  userActionButton: {
    text: 'Generate',
    leftIcon: <SparkleIcon />,
    customComponent: <GenerateButton className="ml-auto" />,
  },
  tooltip: {
    title: 'Create image',
    description: 'Create AI imagery using state-of-the-art image models.',
    variant: 'image',
    image: { src: '/images/prompt-create-image.webp', alt: 'Prompt Create Image' },
    position: 'bottom',
  },
  showAddButton: true,
  addButtonTooltip: {
    title: 'Reference image',
    description: 'Upload a reference image to help the AI generate images that are similar to the reference image.',
    variant: 'text',
    position: 'bottom',
  },
};

