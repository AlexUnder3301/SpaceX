import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LaunchModal from './LaunchModal'

vi.mock('react-dom', () => ({
  createPortal: (children: React.ReactNode) => children,
}))

vi.mock('../assets/dummy-patch.svg', () => ({
  default: 'dummy-patch.svg'
}))

vi.mock('./style.module.scss', () => ({
  default: {
    'modal-overlay': 'modal-overlay',
    'launch-modal': 'launch-modal',
    'modal-header': 'modal-header',
    'modal-header-button': 'modal-header-button',
    'modal-patch': 'modal-patch',
    'modal-section-container': 'modal-section-container',
    'modal-section-container__heading': 'modal-section-container__heading',
    'modal-section-container__content': 'modal-section-container__content',
  }
}))

describe('LaunchModal', () => {
  const mockOnClick = vi.fn()

  const defaultProps = {
    patch: 'test-patch.png',
    name: 'Test Mission',
    rocket: 'Falcon 9',
    details: 'Test mission details',
    onClick: mockOnClick,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    const portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'portal-root')
    document.body.appendChild(portalRoot)
  })

  afterEach(() => {
    const portalRoot = document.getElementById('portal-root')
    if (portalRoot) {
      document.body.removeChild(portalRoot)
    }
  })

  it('renders mission patch when provided', () => {
    render(<LaunchModal {...defaultProps} />)
    
    const image = screen.getByAltText('')
    expect(image).toHaveAttribute('src', 'test-patch.png')
  })

  it('renders dummy patch when patch is null', () => {
    render(<LaunchModal {...defaultProps} patch={null} />)
    
    const image = screen.getByAltText('')
    expect(image).toHaveAttribute('src', 'dummy-patch.svg')
  })

  it('shows "No details" message when details are null', () => {
    render(<LaunchModal {...defaultProps} details={null} />)
    
    expect(screen.getByText('No details :(')).toBeInTheDocument()
  })

  it('calls onClick when close button is clicked', () => {
    render(<LaunchModal {...defaultProps} />)
    
    const closeButton = screen.getByText('X')
    fireEvent.click(closeButton)
    
    expect(mockOnClick).toHaveBeenCalled()
  })
})