export const SITE_URL = 'https://deepakkushwaha.tech'

export const STATIC_PUBLIC_PATHS = ['/', '/about', '/blog', '/hire', '/mock-interview', '/work']

export const WORK_CASE_STUDY_SLUGS = [
  'the-branding-club',
  'ceodekho',
  'khaatadekho',
  'intellectyx',
  'turno',
  'wizcommerce',
  'tally-solutions',
  'pixelai',
]

export function getBackendBaseUrl(): string {
  return (
    process.env.INTERNAL_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:8000'
  )
}
