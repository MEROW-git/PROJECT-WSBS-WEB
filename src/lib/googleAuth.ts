const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

type GoogleCredentialResponse = {
  credential?: string
}

type GoogleProfile = {
  email?: string
  name?: string
}

export type GoogleAccount = {
  token: string
  email: string
  fullName: string
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string
            callback: (response: GoogleCredentialResponse) => void
          }) => void
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black'
              size?: 'large' | 'medium' | 'small'
              type?: 'standard' | 'icon'
              shape?: 'rectangular' | 'pill' | 'circle' | 'square'
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
              width?: number
            }
          ) => void
          prompt: (callback?: (notification: {
            isNotDisplayed: () => boolean
            isSkippedMoment: () => boolean
          }) => void) => void
        }
      }
    }
  }
}

function loadGoogleIdentityScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]'
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Could not load Google sign-in.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Could not load Google sign-in.'))
    document.head.appendChild(script)
  })
}

function decodeGoogleCredential(credential: string): GoogleProfile {
  const payload = credential.split('.')[1]
  if (!payload) return {}

  const normalizedPayload = payload
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(payload.length / 4) * 4, '=')
  const decodedPayload = decodeURIComponent(
    atob(normalizedPayload)
      .split('')
      .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  )

  return JSON.parse(decodedPayload) as GoogleProfile
}

function requireGoogleClientId() {
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'your_google_client_id_here') {
    throw new Error('Google auth is not configured yet. Add VITE_GOOGLE_CLIENT_ID to FRONTEND/.env, then restart the web server.')
  }

  return GOOGLE_CLIENT_ID
}

function toGoogleAccount(credential: string): GoogleAccount {
  const profile = decodeGoogleCredential(credential)
  if (!profile.email || !profile.name) {
    throw new Error('Google did not return your email and name.')
  }

  return {
    token: credential,
    email: profile.email,
    fullName: profile.name,
  }
}

export async function renderGoogleButton(
  parent: HTMLElement,
  text: 'continue_with' | 'signin_with' | 'signup_with',
  onSuccess: (account: GoogleAccount) => void,
  onError: (error: Error) => void
) {
  const clientId = requireGoogleClientId()
  await loadGoogleIdentityScript()

  parent.innerHTML = ''

  window.google?.accounts.id.initialize({
    client_id: clientId,
    callback: (response) => {
      try {
        if (!response.credential) {
          throw new Error('Google did not return a sign-in credential.')
        }

        onSuccess(toGoogleAccount(response.credential))
      } catch (err) {
        onError(err instanceof Error ? err : new Error('Google sign-in failed.'))
      }
    },
  })

  window.google?.accounts.id.renderButton(parent, {
    theme: 'outline',
    size: 'large',
    type: 'standard',
    shape: 'rectangular',
    text,
    width: parent.clientWidth || 384,
  })
}

export async function signInWithGoogle(): Promise<GoogleAccount> {
  const clientId = requireGoogleClientId()
  await loadGoogleIdentityScript()

  return new Promise<GoogleAccount>((resolve, reject) => {
    window.google?.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        try {
          if (!response.credential) {
            throw new Error('Google did not return a sign-in credential.')
          }

          resolve(toGoogleAccount(response.credential))
        } catch (err) {
          reject(err instanceof Error ? err : new Error('Google sign-in failed.'))
        }
      },
    })

    window.google?.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        reject(new Error('Google sign-in was not completed.'))
      }
    })
  })
}
