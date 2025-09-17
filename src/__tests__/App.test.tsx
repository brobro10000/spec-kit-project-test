import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import App from '../App'
import { theme } from '../theme/mantine'

// Minimal fetch mock to satisfy useEffect calls in App
beforeEach(() => {
  global.fetch = vi.fn(async (input: RequestInfo | URL) => {
    const url = typeof input === 'string' ? input : input.toString()
    const data = url.includes('/api/health')
      ? { status: 'ok', message: 'Server is running!', timestamp: new Date().toISOString() }
      : { name: 'spec-kit-project-test', version: '0.0.0', description: 'test', environment: 'test' }

    return {
      ok: true,
      json: async () => data,
    } as Response
  }) as unknown as typeof fetch
})

function renderWithProviders() {
  return render(
    <MantineProvider theme={theme} defaultColorScheme="light">
      <ModalsProvider>
        <Notifications />
        <App />
      </ModalsProvider>
    </MantineProvider>
  )
}

describe('App (Mantine integration)', () => {
  it('renders AppShell header and form controls', async () => {
    renderWithProviders()
    expect(await screen.findByText('Spec-Kit Project Test')).toBeInTheDocument()
    expect(screen.getByLabelText('demo-form')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('shows a notification when clicking the demo button', async () => {
    renderWithProviders()
    const btn = screen.getByRole('button', { name: /show notification/i })
    fireEvent.click(btn)
    expect(await screen.findByText(/hello from notifications/i)).toBeInTheDocument()
  })

  it('has a color scheme toggle', () => {
    renderWithProviders()
    const toggle = screen.getByRole('button', { name: /toggle color scheme/i })
    expect(toggle).toBeInTheDocument()
  })
})
