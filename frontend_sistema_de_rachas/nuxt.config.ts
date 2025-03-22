import { ptBrLocale } from "./utils/date/calendar-locale";
import { TwoEnd } from './assets/theme/2end.theme';
export default defineNuxtConfig({
  ssr: false,
  modules: ["@primevue/nuxt-module"],
  components: {
    global: true,
    dirs: [
      '~/components',
      {
        path: '~/components',
        pattern: '**/*.vue',
      }
    ]
  },
  primevue: {
    components: {
      include: ['Dialog', 'Toast', 'Button', 'DataTable', 'Column', 'ConfirmDialog', 'Chip']
    },
    options: {
      theme: {
        preset: TwoEnd,
      },
      locale: ptBrLocale,
      ripple: true
    },
    directives: {
      include: ['Ripple']
    },
    composables: {
      include: ['useDialog', 'useToast', 'useConfirm']
    }
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["primeicons/primeicons.css", "~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: "http://localhost:3002",
    },
  },
  plugins: ["~/plugins/axios.ts"],
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true
  },
});
