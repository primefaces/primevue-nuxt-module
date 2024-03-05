import { addPlugin, addPluginTemplate, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit';
import { normalize } from 'pathe';
import { register } from './register';
import type { ModuleOptions } from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-primevue',
    configKey: 'primevue',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    usePrimeVue: true,
    resolvePath: undefined,
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    importPT: undefined,
    options: {},
    components: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined
    },
    directives: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined
    },
    composables: {
      //prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined
    }
  },
  hooks: {},
  setup(moduleOptions, nuxt) {
    moduleOptions.components.exclude = moduleOptions.components.exclude || ['Editor', 'Chart'];

    const resolver = createResolver(import.meta.url);
    const registered = register(moduleOptions);
    const { importPT, options } = moduleOptions;

    nuxt.options.runtimeConfig.public.primevue = {
      ...moduleOptions,
      ...registered
    };

    //nuxt.options.build.transpile.push('nuxt');
    nuxt.options.build.transpile.push('primevue');

    const styleContent = () => `
${registered.styles.map((style: any) => `import ${style.as} from '${style.from}';`).join('\n')}

const stylesToTop = [${registered.injectStylesAsStringToTop.join('')}].join('');
const styleProps = {
  ${options?.csp?.nonce ? `nonce: ${options?.csp?.nonce}` : ''}
}
const styles = [
  ${registered.injectStylesAsString.join('')},
  ${registered.styles.map((item) => `${item.as} && ${item.as}.getStyleSheet ? ${item.as}.getStyleSheet(undefined, styleProps) : ''`).join(',')}
].join('');

export { styles, stylesToTop };
`;
    nuxt.options.alias['#primevue-style'] = addTemplate({
      filename: 'primevue-style.mjs',
      getContents: styleContent
    }).dst;

    addPlugin(resolver.resolve('./runtime/plugin.client'));

    addPluginTemplate({
      filename: 'primevue-plugin.mjs',
      getContents() {
        return `
import { defineNuxtPlugin, useRuntimeConfig } from '#imports';
${registered.config.map((config: any) => `import ${config.as} from '${config.from}';`).join('\n')}
${registered.services.map((service: any) => `import ${service.as} from '${service.from}';`).join('\n')}
${registered.directives.map((directive: any) => `import ${directive.as} from '${directive.from}';`).join('\n')}
${importPT ? `import ${importPT.as} from '${normalize(importPT.from)}';\n` : ''}

export default defineNuxtPlugin(({ vueApp }) => {
  const runtimeConfig = useRuntimeConfig();
  const config = runtimeConfig?.public?.primevue ?? {};
  const { usePrimeVue = true, options = {} } = config;
  const pt = ${importPT ? `{ pt: ${importPT.as} }` : `{}`};

  usePrimeVue && vueApp.use(PrimeVue, { ...options, ...pt });
  ${registered.services.map((service: any) => `vueApp.use(${service.as});`).join('\n')}
  ${registered.directives.map((directive: any) => `vueApp.directive('${directive.name}', ${directive.as});`).join('\n')}
});
        `;
      }
    });

    nuxt.hook('nitro:config', async (config) => {
      config.externals = config.externals || {};
      config.externals.inline = config.externals.inline || [];
      config.externals.inline.push(resolver.resolve('./runtime/plugin.server'));
      config.virtual = config.virtual || {};
      config.virtual['#primevue-style'] = styleContent;
      config.plugins = config.plugins || [];
      config.plugins.push(resolver.resolve('./runtime/plugin.server'));
    });
  }
});
