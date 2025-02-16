/* eslint-disable @typescript-eslint/explicit-function-return-type */
import colors, { black, neutral } from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
const generateColors = (colors, prefix) => {
  return Object.keys(colors).reduce((acc, key) => {
    if (key === 'DEFAULT') {
      return {
        ...acc,
        [`.${prefix}`]: {
          color: colors[key]
        }
      };
    }
    if (typeof colors[key] === 'string') {
      return {
        ...acc,
        [`.${prefix}-${key}`]: {
          color: colors[key]
        }
      };
    }

    const innerColors = generateColors(colors[key], `${prefix}-${key}`);
    return {
      ...acc,
      ...innerColors
    };
  }, {});
};

module.exports = {
  theme: {
    iconColor: () => ({
      white: colors.white,
      black: colors.black,
    }),
    extend: {
      backgroundColor: () => ({
        white: colors.white,
        surface: {
          primary: {
            DEFAULT: '#e4e4e4'
          },
          secondary: {
            DEFAULT: '#ccdce7'
          },
          tertiary: {
            DEFAULT: '#555555'
          }
        },
        fill: {
          primary: {
            DEFAULT: '#2b469b',
            subtle: '#2b469b',
            emphasis: '#1d2f69'
          },
          secondary: {
            DEFAULT: '#14a1f6'
          },
          tertiary: {
            DEFAULT: '#0e7dbf'
          },
          info: {
            DEFAULT: '#56acec',
            subtle: '#56acec',
            emphasis: '#4586BC'
          },
          success: {
            DEFAULT: '#8bbf49',
            hover: '#668C35'
          },
          danger: {
            DEFAULT: '#e05f5f',
            hover: '#AC4848'
          },
          warning: {
            DEFAULT: '#ec9d56',
            hover: '#BA7B46'
          },
        }
      }),
      borderColor: () => ({
        primary: {
          DEFAULT: '#2b469b',
        },
        secondary: {
          DEFAULT: '#14a1f6'
        },
        tertiary: {
          DEFAULT: '#0e7dbf'
        },
        info: {
          DEFAULT: '#56acec',
        },
        success: {
          DEFAULT: '#8bbf49',
        },
        danger: {
          DEFAULT: '#e05f5f',
        },
        warning: {
          DEFAULT: '#ec9d56',
        },
        focus: {
          DEFAULT: '#4a82eb'
        }
      }),
      textColor: () => ({
        white: {
          DEFAULT: colors.white,
        },
        black: {
          DEFAULT: colors.black
        },
        primary: {
          DEFAULT: '#313541'
        },
        secondary: {
          DEFAULT: '#2a394f'
        },
        tertiary: {
          DEFAULT: '#4a82eb'
        }
      }),
    }
  },
  plugins: [
    plugin(({ addUtilities, addBase, theme }) => {
      const iconColors = generateColors(theme('iconColor'), 'icon');
      addUtilities(iconColors);
      addBase({
        h1: {
          margin: '0',
          fontSize: '50px',
          fontWeight: '800',
          lineHeight: '70px',
          color: `${theme('textColor.primary')}`
        },
        h2: {
          margin: '0',
          fontSize: '42px',
          fontWeight: '700',
          lineHeight: '60px',
          color: `${theme('textColor.primary')}`
        },
        h3: {
          margin: '0',
          fontSize: '34px',
          fontWeight: '700',
          lineHeight: '50px',
          color: `${theme('textColor.primary')}`
        },
        h4: {
          margin: '0',
          fontSize: '26px',
          fontWeight: '700',
          lineHeight: '50px',
          color: `${theme('textColor.primary')}`
        },
        p: {
          margin: '0',
          fontSize: '16px',
          fontWeight: '300',
          lineHeight: '28px',
          color: `${theme('textColor.primary')}`
        },
        a: {
          fontSize: '14px',
          color: theme('textColor.primary'),
          textDecoration: 'none',
          '&:hover': {
            borderBottom: `1px solid ${theme('textColor.primary')}`
          },
          '&:visited': {
            color: theme('textColor.primary'),
          }
        }
      });
    })
  ]
};
