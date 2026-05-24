import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'xv-navy':        '#253163',
        'xv-navy-deep':   '#1A2B6B',
        'xv-navy-light':  '#2D3E8C',
        'xv-orange':      '#EE7531',
        'xv-orange-light':'#FF9A4A',
        'xv-orange-bg':   '#FFF3EA',
        'xv-cyan':        '#01B3DC',
        'xv-cyan-light':  '#4DC8F5',
        'xv-cyan-bg':     '#E5F7FF',
        'xv-yellow':      '#FBC132',
        'xv-yellow-bg':   '#FFFAE0',
        'xv-gray-50':     '#F5F7FA',
        'xv-gray-100':    '#F2F2F2',
        'xv-gray-200':    '#EDF0FF',
        'xv-gray-300':    '#D0D8F5',
        'xv-gray-500':    '#8A93B8',
        'xv-gray-700':    '#4A5280',
        'xv-text':        '#1A1A2E',
        // backward compat aliases
        primary: { DEFAULT: '#253163', dark: '#1a2347', light: '#2e3d7a' },
        orange:  { DEFAULT: '#EE7531', dark: '#d4641f', light: '#FF9A4A' },
        sky:     { DEFAULT: '#01B3DC', dark: '#0097bc', light: '#33c4e4' },
        yellow:  { DEFAULT: '#FBC132', dark: '#e5a910', light: '#fccf55' },
        neutral: { light: '#F5F7FA' },
      },
      fontFamily: {
        sans:    ['var(--font-nunito)',  'Nunito',  'sans-serif'],
        display: ['var(--font-fredoka)', 'Fredoka', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card:       '0 4px 24px rgba(37,49,99,0.10)',
        'card-hover':'0 8px 40px rgba(37,49,99,0.18)',
        orange:     '0 4px 20px rgba(238,117,49,0.35)',
        'orange-lg':'0 20px 40px -10px rgba(238,117,49,0.45)',
        'cyan-lg':  '0 20px 40px -10px rgba(1,179,220,0.4)',
        'yellow-lg':'0 20px 40px -10px rgba(251,193,50,0.4)',
      },
      animation: {
        'float':       'floatY 5s ease-in-out infinite',
        'float-slow':  'floatY 7s ease-in-out infinite',
        'float-delay': 'floatY 5s ease-in-out 1.5s infinite',
        'spin-slow':   'spin 10s linear infinite',
        'spin-reverse':'spinReverse 12s linear infinite',
        'pulse-ring':  'pulseRing 3s ease-out infinite',
        'ping-dot':    'pingDot 1.5s cubic-bezier(0,0,0.2,1) infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        floatY: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        spinReverse: {
          from: { transform: 'rotate(360deg)' },
          to:   { transform: 'rotate(0deg)' },
        },
        pulseRing: {
          '0%,100%': { transform: 'scale(1)',   opacity: '0.5' },
          '50%':     { transform: 'scale(1.45)', opacity: '0' },
        },
        pingDot: {
          '75%,100%': { transform: 'scale(2)', opacity: '0' },
        },
        bounceSoft: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}

export default config
