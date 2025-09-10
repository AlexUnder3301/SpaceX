import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

vi.mock('ky', () => ({
  default: {
    get: vi.fn(() => ({
      json: vi.fn(() => Promise.resolve([
        {
          mission_name: 'Test Mission',
          rocket: { rocket_name: 'Falcon 9' },
          links: { 
            mission_patch: 'test.png', 
            mission_patch_small: 'test_small.png' 
          },
          details: 'Test details'
        }
      ]))
    }))
  }
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    render(<App />)
    expect(screen.getByText('ЗАГРУЗКА')).toBeInTheDocument()
  })

  it('renders SpaceX header', async () => {
    render(<App />)
    expect(await screen.findByText('SpaceX Launches 2020')).toBeInTheDocument()
  })
})