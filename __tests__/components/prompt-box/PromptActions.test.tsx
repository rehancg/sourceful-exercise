import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PromptActions } from '@/components/prompt-box/PromptActions'

describe('PromptActions', () => {
  it('renders add button when onAddClick is provided', () => {
    const handleAddClick = vi.fn()
    render(<PromptActions onAddClick={handleAddClick} />)
    
    const addButton = screen.getByLabelText(/add reference/i)
    expect(addButton).toBeInTheDocument()
  })

  it('does not render add button when onAddClick is not provided', () => {
    render(<PromptActions />)
    
    const addButton = screen.queryByLabelText(/add reference/i)
    expect(addButton).not.toBeInTheDocument()
  })

  it('calls onAddClick when add button is clicked', async () => {
    const user = userEvent.setup()
    const handleAddClick = vi.fn()
    
    render(<PromptActions onAddClick={handleAddClick} />)
    const addButton = screen.getByLabelText(/add reference/i)
    
    await user.click(addButton)
    expect(handleAddClick).toHaveBeenCalledTimes(1)
  })

  it('renders action button when actionButtonText is provided', () => {
    render(<PromptActions actionButtonText="Generate" onActionClick={vi.fn()} />)
    
    const actionButton = screen.getByRole('button', { name: /generate/i })
    expect(actionButton).toBeInTheDocument()
  })

  it('calls onActionClick when action button is clicked', async () => {
    const user = userEvent.setup()
    const handleActionClick = vi.fn()
    
    render(
      <PromptActions 
        actionButtonText="Generate" 
        onActionClick={handleActionClick} 
      />
    )
    const actionButton = screen.getByRole('button', { name: /generate/i })
    
    await user.click(actionButton)
    expect(handleActionClick).toHaveBeenCalledTimes(1)
  })

  it('renders custom action component when provided', () => {
    const CustomComponent = () => <button>Custom Action</button>
    
    render(<PromptActions customActionComponent={<CustomComponent />} />)
    
    expect(screen.getByText('Custom Action')).toBeInTheDocument()
  })

  it('does not render standard action button when custom component is provided', () => {
    const CustomComponent = () => <button>Custom Action</button>
    
    render(
      <PromptActions 
        customActionComponent={<CustomComponent />}
        actionButtonText="Generate"
        onActionClick={vi.fn()}
      />
    )
    
    const standardButton = screen.queryByRole('button', { name: /generate/i })
    expect(standardButton).not.toBeInTheDocument()
  })

  it('applies aria-label to add button from tooltip', () => {
    const tooltip = {
      title: 'Add reference image',
      description: 'Upload a reference image',
      variant: 'text' as const,
      position: 'bottom' as const,
    }
    
    render(<PromptActions onAddClick={vi.fn()} addButtonTooltip={tooltip} />)
    
    const addButton = screen.getByLabelText('Add reference image')
    expect(addButton).toBeInTheDocument()
  })

  it('has role="group" for action buttons container', () => {
    render(<PromptActions onAddClick={vi.fn()} />)
    
    const group = screen.getByRole('group', { name: /action buttons/i })
    expect(group).toBeInTheDocument()
  })
})

