import { addComponent, addImports } from '@nuxt/kit';
import { components } from './runtime/core/components';
import { composables } from './runtime/core/composables';
import { directives } from './runtime/core/directives';
import { Utils } from './utils';

import type { ComponentsType } from './runtime/core/components/types';
import type { ComposablesType } from './runtime/core/composables/types';
import type { DirectivesType } from './runtime/core/directives/types';
import type { ModuleOptions } from './types';

function registerItems(items: any[] = [], options: ComponentsType = {}, params: any) {
  const imported = Utils.object.getValue(options.import, params);
  const excluded = Utils.object.getValue(options.exclude, params);

  return items.filter((item) => {
    const name = item?.name;
    const matchedIm = imported?.length > 0 ? imported.some((im: string) => name?.toLowerCase() === im.toLowerCase()) : true;
    const matchedEx = excluded?.length > 0 ? excluded.some((ex: string) => name?.toLowerCase() === ex.toLowerCase()) : false;

    return matchedIm && !matchedEx;
  });
}

function registerComponents(options: ComponentsType = {}) {
  const _components = registerItems(components, options, { components });

  _components.forEach((component) =>
    addComponent({
      export: 'default',
      name: `${options.prefix}${component.name}`,
      filePath: `primevue/${component.name.toLowerCase()}`,
      global: true
    })
  );

  return _components;
}

function registerDirectives(options: DirectivesType = {}) {
  const _directives = registerItems(directives, options, { directives });

  _directives.forEach((directive) => ({
    ...directive,
    name: `${options.prefix}${directive.name}`
  }));

  return _directives;
}

function registerComposables(options: ComposablesType = {}) {
  const _composables = registerItems(composables, options, { composables });

  _composables.forEach((composable) =>
    addImports({
      ...composable,
      name: `${options.prefix}${composable.name}`
    })
  );

  return _composables;
}

export function register(options: ModuleOptions) {
  const components = registerComponents(options.components);
  const directives = registerDirectives(options.directives);
  const composables = registerComposables(options.composables);

  return {
    components,
    directives,
    composables
  };
}
