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
          450: '#FCC116',
          550: '#FFF1C8'
        },
        blue: {
          450: '#2AB1BF',
        },
      },
    },
    height: {
      middleHeight: '550px',
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')({
      layout: 'sidebar',
    }),
  ],
}
