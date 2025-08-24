/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'medieval': ['Cinzel', 'serif'],
        'fantasy': ['Uncial Antiqua', 'cursive'],
        'sharp': ['MedievalSharp', 'cursive'],
      },
      colors: {
        tortleGreen: '#4CAF50',
        tortleBrown: '#8B4513',
        tortleYellow: '#FFD700',
        // Artificer-themed colors
        artificerBronze: '#CD7F32',
        artificerCopper: '#B87333',
        artificerSteel: '#71797E',
        artificerGold: '#FFD700',
        artificerBlue: '#4A90E2',
        parchment: '#F4F1E8',
        parchmentDark: '#E8E0D0',
        inkBrown: '#3C2415',
        sealWax: '#8B0000',
      },
      backgroundImage: {
        'parchment': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3C/defs%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"0.1\"/%3E%3C/svg%3E'), linear-gradient(135deg, #F4F1E8 0%, #E8E0D0 25%, #F0EDE4 50%, #E8E0D0 75%, #F4F1E8 100%)",
        'aged-paper': "radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(139, 69, 19, 0.05) 0%, transparent 50%)",
        'paper-grain': "url('data:image/svg+xml,%3Csvg width=\"200\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cfilter id=\"grain\"%3E%3CfeTurbulence baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3CfeColorMatrix values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0\"/%3E%3C/filter%3E%3C/defs%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23grain)\" opacity=\"0.03\"/%3E%3C/svg%3E')",
        'ink-stain': "radial-gradient(ellipse at top left, rgba(60, 36, 21, 0.15) 0%, transparent 40%), radial-gradient(ellipse at bottom right, rgba(60, 36, 21, 0.1) 0%, transparent 35%)",
        'torn-edge': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0,10 Q5,5 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10\" stroke=\"%23E8E0D0\" stroke-width=\"2\" fill=\"none\"/%3E%3C/svg%3E')",
      },
      animation: {
        'candle-flicker': 'candle-flicker 2s ease-in-out infinite alternate',
        'magic-sparkle': 'magic-sparkle 3s ease-in-out infinite',
        'gentle-breathe': 'gentle-breathe 4s ease-in-out infinite',
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}