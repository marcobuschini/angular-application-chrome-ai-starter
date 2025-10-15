export {}

declare global {
  interface Window {
    ai?: {
      createTextSession: () => Promise<AITextSession>
      canCreateTextSession: () => Promise<'readily' | 'after-download' | 'no'>
    }
  }

  interface AITextSession {
    prompt: (prompt: string) => Promise<string>
    destroy: () => void
  }
}
