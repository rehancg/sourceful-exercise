import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PromptInput } from '@/components/prompt-box/PromptInput'

describe('PromptInput', () => {
  it('renders a textarea with placeholder', () => {
    render(<PromptInput placeholder="Enter your prompt" />)
    const textarea = screen.getByPlaceholderText('Enter your prompt')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('displays the provided value', () => {
    render(<PromptInput value="Test prompt" />)
    const textarea = screen.getByDisplayValue('Test prompt')
    expect(textarea).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<PromptInput onChange={handleChange} />)
    const textarea = screen.getByRole('textbox')
    
    await user.type(textarea, 'Hello')
    
    expect(handleChange).toHaveBeenCalledTimes(5) // Once for each character
  })

  it('calls onSubmit when form is submitted', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn((e) => {
      e.preventDefault()
    })
    
    render(<PromptInput onSubmit={handleSubmit} />)
    const form = screen.getByRole('textbox').closest('form')
    
    if (form) {
      // Submit the form directly
      await user.type(screen.getByRole('textbox'), 'Test')
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
      form.dispatchEvent(submitEvent)
      
      expect(handleSubmit).toHaveBeenCalled()
    }
  })

  it('applies custom className', () => {
    render(<PromptInput className="custom-class" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('custom-class')
  })

  it('forwards textarea props', () => {
    render(<PromptInput textareaProps={{ 'data-testid': 'custom-textarea' }} />)
    const textarea = screen.getByTestId('custom-textarea')
    expect(textarea).toBeInTheDocument()
  })

  it('applies aria-label when provided', () => {
    render(<PromptInput aria-label="Enter your prompt" />)
    const textarea = screen.getByLabelText('Enter your prompt')
    expect(textarea).toBeInTheDocument()
  })

  it('applies aria-describedby when provided', () => {
    render(<PromptInput aria-describedby="help-text" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('aria-describedby', 'help-text')
  })

  it('applies id when provided', () => {
    render(<PromptInput id="prompt-input" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('id', 'prompt-input')
  })
})

