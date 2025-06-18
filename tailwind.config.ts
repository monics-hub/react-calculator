import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
  './index.html',
  './src/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config