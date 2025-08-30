module.exports = {
    theme: {
      extend: {
        keyframes: {
          shimmer: {
            '0%': { 'background-position': '0% 100%' },
            '100%': { 'background-position': '100% 0%' },
          },
        },
        animation: {
          shimmer: 'shimmer 15s linear infinite', 
        },
      },
    },
  }
  