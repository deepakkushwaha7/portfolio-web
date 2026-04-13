import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        white: '#f5f5f0',
        gray: {
          100: '#f0efea',
          200: '#e0dfd9',
          300: '#c8c7c0',
          400: '#a8a79f',
          500: '#88877e',
          600: '#68675e',
          700: '#48473e',
          800: '#28271e',
          900: '#18170e',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        noise: "url('/noise.svg')",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'fade-up': 'fade-up 0.6s ease forwards',
        blink: 'blink 1s step-end infinite',
        'slide-in-right': 'slide-in-right 0.4s ease forwards',
        'slide-out-right': 'slide-out-right 0.4s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
