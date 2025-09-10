import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LaunchCard from './LaunchCard'

vi.mock('@mantine/core', () => ({
  Card: ({ children, ...props }: React.PropsWithChildren) => <div {...props}>{children}</div>,
  Button: ({ children, ...props }: React.PropsWithChildren) => <button {...props}>{children}</button>,
}))

vi.mock('../assets/dummy-patch.svg', () => ({
  default: 'dummy-patch.svg'
}))

describe('LaunchCard', () => {
  const mockHandleModalOpen = vi.fn()

  const defaultProps = {
    name: 'Test Mission',
    rocketName: 'Falcon 9',
    patch: 'test-patch.png',
    handleModalOpen: mockHandleModalOpen,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders mission name and rocket name', () => {
    render(<LaunchCard {...defaultProps} />)
    
    expect(screen.getByText('Test Mission')).toBeInTheDocument()
    expect(screen.getByText('Falcon 9')).toBeInTheDocument()
  })

  it('renders mission patch when provided', () => {
    render(<LaunchCard {...defaultProps} />)
    
    const image = screen.getByAltText('')
    expect(image).toHaveAttribute('src', 'test-patch.png')
  })

  it('renders dummy patch when patch is null', () => {
    render(<LaunchCard {...defaultProps} patch={null} />)
    
    const image = screen.getByAltText('')
    expect(image).toHaveAttribute('src', 'dummy-patch.svg')
  })

  it('calls handleModalOpen with mission name when button is clicked', () => {
    render(<LaunchCard {...defaultProps} />)
    
    const button = screen.getByText('See more')
    fireEvent.click(button)
    
    expect(mockHandleModalOpen).toHaveBeenCalledWith('Test Mission')
  })
})