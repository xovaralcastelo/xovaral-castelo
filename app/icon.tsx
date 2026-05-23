import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#253163',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ee7531',
          fontWeight: 900,
          fontSize: 20,
          fontFamily: 'sans-serif',
        }}
      >
        X
      </div>
    ),
    { ...size }
  )
}
