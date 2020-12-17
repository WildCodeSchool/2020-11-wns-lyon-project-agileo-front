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
          550: '#FFF1C8',
        },
        blue: {
          450: '#2AB1BF',
        },
        orange: {
          450: '#FA6424',
        },
      },
      width: {
        550: '550px',
      },
    },
    height: {
      450: '450px',
      190: '190px',
      seventeen: '70px',
    },
    borderRadius: {
      50: '50%',
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')({
      layout: 'sidebar',
    }),
  ],
}
