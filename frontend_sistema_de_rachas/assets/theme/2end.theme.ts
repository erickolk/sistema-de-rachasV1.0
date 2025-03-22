import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import Button from '@primevue/themes/aura/button';

export const TwoEnd = definePreset(Aura, {
  semantic: {
    secondary: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#F44336',
      600: '#E53935',
      700: '#D32F2F',
      800: '#C62828',
      900: '#B71C1C',
      950: '#7F0000',
    },
    accent: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#F44336',
      600: '#E53935',
      700: '#D32F2F',
      800: '#C62828',
      900: '#B71C1C',
      950: '#7F0000',
    },
    error: {
      500: '#F44336',
    },
    warning: {
      500: '#FFEB3B',
    },
    info: {
      500: '#2196F3',
    },
    success: {
      500: '#4CAF50',
    },
  },
  components: {
    button: {
      root: {
        paddingX: '1rem',
        paddingY: '0.5rem',
        borderRadius: '0.25rem',

        sm: {
            paddingX: '0.5rem',
            paddingY: '0.15rem',
            fontSize: '0.6rem',
        }
      },
    },
  },
});