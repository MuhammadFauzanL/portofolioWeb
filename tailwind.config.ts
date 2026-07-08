import type { Config } from 'tailwindcss'

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'ink-black': '#15151A',
        'deep-ink': '#0B0B0E',
        'paper-white': '#FAFAF8',
        'signal-red': '#E8384F',
        'slate-muted': '#6B6C72',
        'hairline': '#E5E4E0',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'bounce-limited': 'bounce 1s ease-in-out 3'
      }
    },
  },
  plugins: [],
} satisfies Config
