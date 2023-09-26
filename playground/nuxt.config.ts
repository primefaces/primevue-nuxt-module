export default defineNuxtConfig({
  modules: ['../src/module'],
  primevue: {
    options: {
      // ripple, inputStyle etc.
      unstyled: true,
      ripple: true,
      pt: {
        button: {
          label: 'MMMM'
        }
      }
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
  devtools: { enabled: true }
});
