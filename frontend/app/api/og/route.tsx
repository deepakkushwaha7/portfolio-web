import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Deepak Kushwaha'
  const subtitle = searchParams.get('subtitle') ?? 'AI Architect & Engineering Leader'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        {/* Top accent line */}
        <div style={{ width: 80, height: 4, background: '#f5f5f0', marginBottom: 48 }} />

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? 56 : 72,
            fontWeight: 900,
            color: '#f5f5f0',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#808078',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}
        >
          {subtitle}
        </div>

        {/* Bottom: domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            right: 80,
            fontSize: 22,
            color: '#383830',
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
          }}
        >
          deepakkushwaha.tech
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
