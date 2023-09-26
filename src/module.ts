import { addPlugin, addServerPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import { register } from './register';
import type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtjs/primevue',
    configKey: 'primevue',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {},
  hooks: {},
  setup(moduleOptions, nuxt) {
    const resolver = createResolver(import.meta.url);
    const registered = register(moduleOptions);

    nuxt.options.runtimeConfig.public.primevue = {
      ...registered,
      options: moduleOptions.options
    };

    nuxt.options.build.transpile.push('nuxt');
    nuxt.options.build.transpile.push('primevue');

    addServerPlugin(resolver.resolve('./runtime/plugin.server'));
    addPlugin(resolver.resolve('./runtime/plugin.client'));
  }
});
