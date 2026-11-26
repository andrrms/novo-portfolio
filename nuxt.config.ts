import tailwindcss from '@tailwindcss/vite'; 

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/content',
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: ['~/assets/css/tailwind.css'],

  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  runtimeConfig: {
    lastfmApiKey: '',
    lastfmUser: '',
  },

  fonts: {
    defaults: {
      weights: ['100 900'],
    },
    // Letra de mão da etiqueta da fita; aparece só dentro de um SVG e não é detectada sozinha.
    families: [
      { name: 'Caveat', provider: 'google', weights: [500, 700] },
    ],
  },
});
