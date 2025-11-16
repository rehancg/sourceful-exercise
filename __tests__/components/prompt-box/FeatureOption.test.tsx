import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FeatureOption } from '@/components/prompt-box/FeatureOption'
import { PROMPT_BOX_FEATURES } from '@/lib/prompt-box-features'

describe('FeatureOption', () => {
  const mockFeature = PROMPT_BOX_FEATURES[0] // ai-imagery

  it('renders feature label', () => {
    render(<FeatureOption feature={mockFeature} />)
    const button = screen.getByRole('tab')
    // Check that the label is within the button
    expect(button).toHaveTextContent(mockFeature.label)
  })

  it('renders as selected when isSelected is true', () => {
    render(<FeatureOption feature={mockFeature} isSelected={true} />)
    const button = screen.getByRole('tab')
    expect(button).toHaveAttribute('aria-selected', 'true')
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('renders as not selected when isSelected is false', () => {
    render(<FeatureOption feature={mockFeature} isSelected={false} />)
    const button = screen.getByRole('tab')
    expect(button).toHaveAttribute('aria-selected', 'false')
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<FeatureOption feature={mockFeature} onClick={handleClick} />)
    const button = screen.getByRole('tab')
    
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has correct aria-label with feature status', () => {
    render(<FeatureOption feature={mockFeature} isSelected={true} />)
    const button = screen.getByRole('tab')
    expect(button).toHaveAttribute('aria-label', expect.stringContaining(mockFeature.label))
  })

  it('includes "new feature" in aria-label when isNew is true', () => {
    const newFeature = { ...mockFeature, isNew: true }
    render(<FeatureOption feature={newFeature} />)
    const button = screen.getByRole('tab')
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('new feature'))
  })

  it('includes "coming soon" in aria-label when comingSoon is true', () => {
    const comingSoonFeature = { ...mockFeature, comingSoon: true }
    render(<FeatureOption feature={comingSoonFeature} />)
    const button = screen.getByRole('tab')
    expect(button).toHaveAttribute('aria-label', expect.stringContaining('coming soon'))
  })

  it('has tabIndex 0 when selected', () => {
    render(<FeatureOption feature={mockFeature} isSelected={true} />)
    const button = screen.getByRole('tab')
    expect(button).toHaveAttribute('tabIndex', '0')
  })

  it('has tabIndex -1 when not selected', () => {
    render(<FeatureOption feature={mockFeature} isSelected={false} />)
    const button = screen.getByRole('tab')
    expect(button).toHaveAttribute('tabIndex', '-1')
  })

  it('has data-feature-id attribute', () => {
    render(<FeatureOption feature={mockFeature} />)
    const button = screen.getByRole('tab')
    expect(button).toHaveAttribute('data-feature-id', mockFeature.id)
  })

  it('renders feature icon', () => {
    render(<FeatureOption feature={mockFeature} />)
    const button = screen.getByRole('tab')
    const iconContainer = button.querySelector('svg')
    expect(iconContainer).toBeInTheDocument()
  })
})

