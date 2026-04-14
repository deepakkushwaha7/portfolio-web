import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import path from 'path'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Deepak Kushwaha — AI Architect & Engineering Leader'

export default function OgImage() {
  const fontData = readFileSync(
    path.join(
      process.cwd(),
      'node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf',
    ),
  )

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Geist, system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid lines — decorative */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(245,245,240,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,240,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Top border accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #f5f5f0 0%, rgba(245,245,240,0.2) 100%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '64px 72px',
            flex: 1,
          }}
        >
          {/* Left: text */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Label */}
            <div
              style={{
                fontSize: 13,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(245,245,240,0.4)',
                marginBottom: 28,
                fontWeight: 400,
              }}
            >
              AI Architect &amp; Engineering Leader
            </div>

            {/* Name */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 88,
                fontWeight: 700,
                color: '#f5f5f0',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                marginBottom: 32,
              }}
            >
              <span>DEEPAK</span>
              <span>KUSHWAHA</span>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 32,
                marginBottom: 40,
              }}
            >
              {[
                ['9+', 'YEARS'],
                ['20+', 'PRODUCTS'],
                ['100M+', 'USERS'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: '#f5f5f0',
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.2em',
                      color: 'rgba(245,245,240,0.35)',
                      fontWeight: 400,
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* URL */}
            <div
              style={{
                fontSize: 14,
                letterSpacing: '0.1em',
                color: 'rgba(245,245,240,0.5)',
                fontWeight: 400,
              }}
            >
              deepakkushwaha.tech
            </div>
          </div>

          {/* Right: DK monogram */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 260,
              height: 260,
              border: '1px solid rgba(245,245,240,0.12)',
              flexShrink: 0,
              marginLeft: 48,
              position: 'relative',
            }}
          >
            {/* Corner accents */}
            <div
              style={{
                position: 'absolute',
                top: -1,
                left: -1,
                width: 20,
                height: 20,
                borderTop: '2px solid rgba(245,245,240,0.6)',
                borderLeft: '2px solid rgba(245,245,240,0.6)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -1,
                right: -1,
                width: 20,
                height: 20,
                borderBottom: '2px solid rgba(245,245,240,0.6)',
                borderRight: '2px solid rgba(245,245,240,0.6)',
              }}
            />
            <span
              style={{
                fontSize: 110,
                fontWeight: 700,
                color: '#f5f5f0',
                letterSpacing: '-8px',
                lineHeight: 1,
              }}
            >
              DK
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
