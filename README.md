# PrimeVue Nuxt Module

![nuxt-primevue](https://github.com/primefaces/primevue-nuxt-module/assets/11868120/c35e1180-573f-4650-bbe9-0c79bff71f05)


## Quick Setup

1. Add `nuxt-primevue` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-primevue

# Using yarn
yarn add --dev nuxt-primevue

# Using npm
npm install --save-dev nuxt-primevue
```

2. Add `nuxt-primevue` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-primevue'
  ],
  /**
   * The key defined to configure the nuxt-primevue module.
   */
  primevue: {
    /**
     * Whether PrimeVue plugin's configs will be initialized by the module automatically. 
     * @type {boolean}
     * @defaultValue true
     */
    usePrimeVue: true,
    /**
     * Defines the [configs](https://primevue.org/configuration/) used by PrimeVue plugin.
     * @type {PrimeVueConfiguration}
     * @defaultValue {}
     */
    options: {
      // ripple, inputStyle, unstyled etc.
    },
    /**
     * Defines configurations for components such as Button, DataTable and so on.
     * @type {ComponentsType}
     * @example
     * app.component(name, as);
     */
    components: {
      /**
       * Defines the prefix for the names.
       * @type {string}
       * @example
       * [input]
       * prefix: 'x'
       * 
       * [output]
       * app.component('xButton', Button);
       */
      prefix: '',
      /**
       * Used to customize names.
       * @param {{name: string, as: string, from: string}} item - Custom item object.
       * @return {string}
       * @example
       * [input]
       * name: ({ name, as }) => {
       *   return as === 'Button' ? `My${name}` : name
       * }
       * 
       * [output]
       * app.component('MyButton', Button);
       * app.component('DataTable', DataTable);
       */
      name: undefined,
      /**
       * Used to determine which components to register. When the default value and '*' values are set, all components are registered.
       * @type {'*' | string[] | ((list: any) => string[] | undefined) | undefined}
       * @example
       * [input]
       * include: undefined or '*'
       * 
       * [output]
       * app.component(..., ...); // For all components
       * 
       * ---
       * [input]
       * include: ['Button', 'DataTable']
       * 
       * [output]
       * app.component('Button', Button);
       * app.component('DataTable', DataTable);
       * 
       * ---
       * [input]
       * include: (list) => {
       *   // The list of all PrimeVue components
       *   return list.components.filter((component) => ...)
       * }
       * 
       * [output]
       * app.component(..., ...); // For the filtered components
       */
      include: undefined,
      /**
       * Used to determine which components will *NOT* be registered. When the default value and '*' values are set, no components are registered. But, priority is always given to the `include` option.
       * @type {'*' | string[] | ((list: any) => string[] | undefined) | undefined}
       * @example
       * [input]
       * exclude: ['Button', 'DataTable']
       * 
       * [output]
       * app.component(..., ...); // For all components except Button and DataTable.
       */
      exclude: undefined
    },
    /**
     * Defines configurations for directives such as v-ripple, v-tooltip, v-badge.
     * @type {ComposablesType}
     * @example
     * app.directive(name, as);
     */
    directives: {
      /**
       * Defines the prefix for the names.
       * @type {string}
       * @example
       * [input]
       * prefix: 'x'
       * 
       * [output]
       * app.directive('xripple', Ripple);
       */
      prefix: '',
      /**
       * Used to customize names.
       * @param {{name: string, as: string, from: string}} item - Custom item object.
       * @return {string}
       * @example
       * [input]
       * name: ({ name, as }) => {
       *   return as === 'Ripple' ? `My${name}` : name
       * }
       * 
       * [output]
       * app.directive('Myripple', Ripple);
       * app.component('tooltip', Tooltip);
       */
      name: undefined,
      /**
       * Used to determine which directives to register. When the default value and '*' values are set, all directives are registered.
       * @type {'*' | string[] | ((list: any) => string[] | undefined) | undefined}
       * @example
       * [input]
       * include: undefined or '*'
       * 
       * [output]
       * app.directive(..., ...); // For all directives
       * 
       * ---
       * [input]
       * include: ['Ripple', 'Tooltip']
       * 
       * [output]
       * app.directive('ripple', Ripple);
       * app.directive('tooltip', Tooltip);
       * 
       * ---
       * [input]
       * include: (list) => {
       *   // The list of all PrimeVue directive
       *   return list.directives.filter((directive) => ...)
       * }
       * 
       * [output]
       * app.directive(..., ...); // For the filtered directives
       */
      include: undefined,
      /**
       * Used to determine which directives will *NOT* be registered. When the default value and '*' values are set, no directives are registered. But, priority is always given to the `include` option.
       * @type {'*' | string[] | ((list: any) => string[] | undefined) | undefined}
       * @example
       * [input]
       * exclude: ['Ripple', 'Tooltip']
       * 
       * [output]
       * app.directive(..., ...); // For all directives except Ripple and Tooltip.
       */
      exclude: undefined
    },
    /**
     * Defines configurations for composables such as useStyle.
     * @type {ComposablesType}
     * [Composables Documentation](https://nuxt.com/docs/guide/going-further/modules#injecting-composables-with-addimports-and-addimportsdir)
     */
    composables: {
      /**
       * Defines the prefix for the names.
       * @type {string}
       * @example
       * [input]
       * prefix: 'x'
       * 
       * [import]
       * addImports({
       *   name: 'xuseStyle', // name of the composable to be used
       *   as: 'useStyle', 
       *   from: 'primevue/usestyle' // path of composable 
       * })
       */
      prefix: '',
      /**
       * Used to customize names.
       * @param {{name: string, as: string, from: string}} item - Custom item object.
       * @return {string}
       * @example
       * [input]
       * name: ({ name, as }) => {
       *   return as === 'useStyle' ? `My${name}` : name
       * }
       * 
       * [import]
       * addImports({
       *   name: 'MyuseStyle', // name of the composable to be used
       *   as: 'useStyle', 
       *   from: 'primevue/usestyle' // path of composable 
       * });
       */
      name: undefined,
      /**
       * Used to determine which composables to register. When the default value and '*' values are set, all composables are registered.
       * @type {'*' | string[] | ((list: any) => string[] | undefined) | undefined}
       * @example
       * [input]
       * include: undefined or '*'
       * 
       * [import]
       * // For all composables
       * addImports({
       *   name: '...', // name of the composable to be used
       *   as: '...', 
       *   from: '...' // path of composable 
       * });
       */
      include: undefined,
      /**
       * Used to determine which composables will *NOT* be registered. When the default value and '*' values are set, no composables are registered. But, priority is always given to the `include` option.
       * @type {'*' | string[] | ((list: any) => string[] | undefined) | undefined}
       * @example
       * [input]
       * exclude: ['useStyle']
       * 
       * [output]
       * // For all composables except useStyle.
       * addImports({
       *   name: '...', // name of the composable to be used
       *   as: '...', 
       *   from: '...' // path of composable 
       * });
       */
      exclude: undefined
    }
  },
})
```

That's it! You can now use `nuxt-primevue` in your Nuxt app ✨
