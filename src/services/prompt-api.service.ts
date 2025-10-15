import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PromptApiService {
  // We use a signal to track the API status
  public apiStatus = signal<'loading' | 'ready' | 'unsupported'>('loading')
  private _session: AITextSession | null = null

  public constructor() {
    this.initializeSession()
  }

  // Initialize session with the AI API
  public async initializeSession(): Promise<void> {
    if (!window.ai || !window.ai.canCreateTextSession) {
      this.apiStatus.set('unsupported')
      return
    }

    try {
      const canCreate = await window.ai.canCreateTextSession()
      if (canCreate !== 'no') {
        this._session = await window.ai.createTextSession()
        this.apiStatus.set('ready')
      } else {
        this.apiStatus.set('unsupported')
      }
    } catch (error) {
      console.error('Error during AI session initialization:', error)
      this.apiStatus.set('unsupported')
    }
  }

  // Send a prompt to the AI and get a response
  public async generate(prompt: string): Promise<string | null> {
    if (this.apiStatus() !== 'ready' || !this._session) {
      console.error('The AI service is not ready or supported.')
      return 'The AI service is not ready or supported.'
    }

    try {
      // Use the prompt method to get a response
      const response = await this._session.prompt(prompt)
      return response
    } catch (error) {
      console.error('Error during text generation:', error)
      return 'An error occurred while generating the text.'
    }
  }
}
