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
  important: true,
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
          DEAFULT: '#4a82eb'
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
          color: `${theme('colors.primary')}`
        },
        h2: {
          margin: '0',
          fontSize: '42px',
          fontWeight: '700',
          lineHeight: '60px',
          color: `${theme('colors.primary')}`
        },
        h3: {
          margin: '0',
          fontSize: '34px',
          fontWeight: '700',
          lineHeight: '50px',
          color: `${theme('colors.primary')}`
        },
        h4: {
          margin: '0',
          fontSize: '26px',
          fontWeight: '700',
          lineHeight: '50px',
          color: `${theme('colors.primary')}`
        },
        p: {
          margin: '0',
          fontSize: '16px',
          fontWeight: '300',
          lineHeight: '28px',
          color: `${theme('colors.primary')}`
        },
        tr: {
          fontSize: '14px',
          backgroundColor: '#FFF',
          textAlign: 'start',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          'td:first-child': {
            paddingLeft: '24px'
          },
          outlineOffset: '0px',
          outlineColor: theme('colors.violet.700')
        },
        thead: {
          backgroundColor: '#FFF',
          outline: `1px solid ${theme('colors.gray.200')}`,
          'th:first-child': {
            paddingLeft: '24px'
          },
          '& tr': {
            display: 'block'
          },
          '& th': {
            fontWeight: '500',
            lineHeight: '16px',
            color: '#6B7280',
            minWidth: '16px',
            padding: '12px'
          }
        },
        td: {
          fontWeight: '400',
          lineHeight: '20px',
          color: '#111827',
          minWidth: '16px',
          padding: '14px 12px'
        },
        tbody: {
          '& tr': {
            borderBottom: `1px solid ${theme('colors.gray.200')}`,
            '&:hover': {
              backgroundColor: theme('colors.gray.50')
            }
          },
          'td:has(jex-icon-button)': {
            padding: '0px !important',
            width: '48px'
          }
        },
        a: {
          fontSize: '14px',
          color: theme('colors.violet.600'),
          textDecoration: 'none',
          '&:hover': {
            borderBottom: `1px solid ${theme('colors.violet.600')}`
          }
        }
      });
    })
  ]
};
