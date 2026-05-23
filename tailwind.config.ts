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
        primary: {
          DEFAULT: '#253163',
          dark: '#1a2347',
          light: '#2e3d7a',
        },
        orange: {
          DEFAULT: '#ee7531',
          dark: '#d4641f',
          light: '#f5913e',
        },
        sky: {
          DEFAULT: '#01b3dc',
          dark: '#0097bc',
          light: '#33c4e4',
        },
        yellow: {
          DEFAULT: '#fbc132',
          dark: '#e5a910',
          light: '#fccf55',
        },
        neutral: {
          light: '#f2f2f2',
        },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'Nunito', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 4px 24px rgba(37, 49, 99, 0.10)',
        'card-hover': '0 8px 40px rgba(37, 49, 99, 0.18)',
        orange: '0 4px 20px rgba(238, 117, 49, 0.35)',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
