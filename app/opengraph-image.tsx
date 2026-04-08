import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Crypto Dashboard';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #000, #1a1a1a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#fff"/>
            <path d="M8 8v16h16" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24 12l-6 6-4-4-4 4" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Crypto Dashboard</span>
        </div>
        <div style={{ fontSize: 32, marginTop: 20, opacity: 0.8 }}>
          Real-time cryptocurrency market data
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
