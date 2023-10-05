import { addPlugin, addPluginTemplate, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit';
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
  defaults: {
    usePrimeVue: true,
    options: {},
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
  hooks: {},
  setup(moduleOptions, nuxt) {
    const resolver = createResolver(import.meta.url);
    const registered = register(moduleOptions);

    const styleContent = `
import { useRuntimeConfig } from '#imports';

async function importStyleModules() {
  const runtimeConfig = useRuntimeConfig();
  const config = runtimeConfig?.public?.primevue ?? {};
  const { options = {} } = config;

  try {
    const modules = await Promise.all([
      import('primevue/base/style'),
      ${registered.components.length > 0 ? `!options.unstyled ? import('primevue/basecomponent/style') : ''` : ''},
      ${[registered.components, registered.directives]
        .flat()
        .reduce((acc: any[], citem: any) => (acc.some((item) => item.name.toLowerCase() === citem.name.toLowerCase()) ? acc : [...acc, citem]), [])
        .map((item: any) => `!options.unstyled ? import('primevue/${item.name.toLowerCase()}/style') : ''`)
        .join(',')}
    ]);

    return modules.map((module) => module && module.getStyleSheet ? module.getStyleSheet() : '').join('');
  } catch (error) {
    console.error('PrimeVue Nuxt Module: ', error);
  }
}

export { importStyleModules };
`;
    nuxt.options.alias['#primevue-style'] = addTemplate({
      filename: 'primevue-style.mjs',
      getContents: () => styleContent
    }).dst;

    nuxt.options.runtimeConfig.public.primevue = {
      ...registered,
      options: moduleOptions.options
    };

    nuxt.hook('nitro:config', async (config) => {
      config.externals = config.externals || {};
      config.externals.inline = config.externals.inline || [];
      config.externals.inline.push(resolver.resolve('./runtime/plugin.server'));
      config.virtual = config.virtual || {};
      config.virtual['#primevue-style'] = styleContent;
      config.plugins = config.plugins || [];
      config.plugins.push(resolver.resolve('./runtime/plugin.server'));
    });

    //nuxt.options.build.transpile.push('nuxt');
    nuxt.options.build.transpile.push('primevue');

    addPlugin(resolver.resolve('./runtime/plugin.client'));

    addPluginTemplate({
      filename: 'primevue-config-plugin.server.mjs',
      mode: 'server',
      getContents() {
        return `
import { defineNuxtPlugin, useRuntimeConfig } from '#imports';

import PrimeVue from 'primevue/config';

export default defineNuxtPlugin(({ vueApp }) => {
  const runtimeConfig = useRuntimeConfig();
  const config = runtimeConfig?.public?.primevue ?? {};
  const { usePrimeVue = true } = config;

  usePrimeVue && vueApp.use(PrimeVue, ${JSON.stringify(moduleOptions.options)});
})
        `;
      }
    });
  }
});
