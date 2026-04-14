import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        background: '#0a0a0a',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontWeight: 900,
          fontSize: 100,
          color: '#f5f5f0',
          letterSpacing: '-6px',
          lineHeight: 1,
        }}
      >
        DK
      </span>
    </div>,
    { ...size },
  )
}
