/* eslint-disable @typescript-eslint/explicit-function-return-type */
import colors, { black } from 'tailwindcss/colors';
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
        fill: {
          DEFAULT: '#4a82eb',
          primary: {
            DEFAULT: '#4a82eb',
            hover: '#3966B7'
          },
          info: {
            DEFAULT: '#56acec',
            hover: '#4586BC'
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
        focus: {
          DEAFULT: '#4a82eb'
        },
        danger: {
          DEFAULT: '#e05f5f'
        },
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
        danger: {
          DEFAULT: '#e05f5f'
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
          color: `${theme('colors.black')}`
        },
        h2: {
          margin: '0',
          fontSize: '42px',
          fontWeight: '700',
          lineHeight: '60px',
          color: `${theme('colors.black')}`
        },
        h3: {
          margin: '0',
          fontSize: '34px',
          fontWeight: '700',
          lineHeight: '50px',
          color: `${theme('colors.black')}`
        },
        h4: {
          margin: '0',
          fontSize: '26px',
          fontWeight: '700',
          lineHeight: '50px',
          color: `${theme('colors.black')}`
        },
        p: {
          margin: '0',
          fontSize: '16px',
          fontWeight: '300',
          lineHeight: '28px',
          color: `${theme('colors.black')}`
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
