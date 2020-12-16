module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#333',
        yellow: {
          '450': '#FCC116',
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')({
      layout: 'sidebar',
    }),
  ],
}
