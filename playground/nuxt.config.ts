export default defineNuxtConfig({
  modules: ['../src/module'],
  primevue: {
    usePrimeVue: true,
    options: {
      // ripple, inputStyle etc.
      ripple: true,
      pt: {
        panel: {
          header: 'my-panel-header'
        }
      }
    },
    components: {
      prefix: 'p',
      include: '*',
      exclude: []
    },
    directives: {
      prefix: '',
      include: [],
      exclude: '*'
    },
    composables: {
      prefix: '',
      include: [],
      exclude: []
    }
  },
  devtools: { enabled: true },
  css: ['primevue/resources/themes/lara-light-indigo/theme.css']
});
