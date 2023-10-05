export default defineNuxtConfig({
  modules: ['../src/module'],
  primevue: {
    usePrimeVue: true,
    options: {
      // ripple, inputStyle etc.
      pt: {
        panel: {
          header: 'my-panel-header'
        }
      }
    },
    components: {
      prefix: '',
      import: ['Panel', 'Button'],
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
