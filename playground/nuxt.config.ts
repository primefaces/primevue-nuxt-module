export default defineNuxtConfig({
  modules: ['../src/module'],
  primevue: {
    usePrimeVue: true,
    options: {
      // ripple, inputStyle etc.
    },
    components: {
      prefix: '',
      import: [],
      exclude: []
    },
    directives: {
      prefix: '',
      import: [],
      exclude: []
    },
    composables: {
      prefix: '',
      import: [],
      exclude: []
    }
  },
  devtools: { enabled: true },
  css: ['primevue/resources/themes/lara-light-indigo/theme.css']
});
