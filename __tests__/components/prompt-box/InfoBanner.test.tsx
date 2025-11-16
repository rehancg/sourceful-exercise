import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InfoBanner } from '@/components/prompt-box/InfoBanner'

describe('InfoBanner', () => {
  it('renders the message text', () => {
    const message = 'This is an info message'
    render(<InfoBanner message={message} />)
    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it('has role="status" for screen readers', () => {
    render(<InfoBanner message="Test message" />)
    const banner = screen.getByRole('status')
    expect(banner).toBeInTheDocument()
  })

  it('has aria-live="polite" for announcements', () => {
    render(<InfoBanner message="Test message" />)
    const banner = screen.getByRole('status')
    expect(banner).toHaveAttribute('aria-live', 'polite')
  })

  it('applies custom className', () => {
    render(<InfoBanner message="Test" className="custom-class" />)
    const banner = screen.getByRole('status')
    expect(banner).toHaveClass('custom-class')
  })

  it('applies id when provided', () => {
    render(<InfoBanner message="Test" id="info-banner" />)
    const banner = screen.getByRole('status')
    expect(banner).toHaveAttribute('id', 'info-banner')
  })

  it('displays an info icon', () => {
    render(<InfoBanner message="Test message" />)
    const banner = screen.getByRole('status')
    const iconContainer = banner.querySelector('svg')
    expect(iconContainer).toBeInTheDocument()
  })
})

