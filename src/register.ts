import { addComponent, addImports } from '@nuxt/kit';
import { components } from './runtime/core/components';
import { composables } from './runtime/core/composables';
import { directives } from './runtime/core/directives';
import { Utils } from './utils';

import type { ComponentType, ComponentsType } from './runtime/core/components/types';
import type { ComposableType, ComposablesType } from './runtime/core/composables/types';
import type { DirectiveType, DirectivesType } from './runtime/core/directives/types';
import type { ConstructsType, ItemType } from './runtime/core/types';
import type { ModuleOptions, ResolvePathOptions } from './types';

function registerItems(items: any[] = [], options: ConstructsType = {}, params: any) {
  const included = Utils.object.getValue(options.include, params);
  const excluded = Utils.object.getValue(options.exclude, params);

  return items.filter((item) => {
    const name = item?.name;
    const matchedIn = included === '*' || included === undefined ? true : Utils.object.isNotEmpty(included) ? included.some((inc: string) => name?.toLowerCase() === inc.toLowerCase()) : false;
    const matchedEx = excluded === '*' ? true : Utils.object.isNotEmpty(excluded) ? excluded.some((exc: string) => name?.toLowerCase() === exc.toLowerCase()) : false;

    return matchedIn && !matchedEx;
  });
}

function registerConfig(resolvePath: any) {
  return [
    {
      name: 'PrimeVue',
      as: 'PrimeVue',
      from: resolvePath({ name: 'PrimeVue', as: 'PrimeVue', from: `primevue/config`, type: 'config' })
    }
  ];
}

function registerComponents(resolvePath: any, options: ComponentsType = {}) {
  const items: ComponentType[] = registerItems(components, options, { components });

  return items.map((item: ComponentType) => {
    const name = Utils.object.getName(item, options);
    const as = item.name;
    const from = resolvePath({ name, as, from: `primevue/${item.name.toLowerCase()}`, type: 'component' });
    const opt = {
      export: 'default',
      name,
      filePath: from,
      global: true
    };

    addComponent(opt);

    return {
      ...item,
      ...opt,
      as,
      from
    };
  });
}

function registerDirectives(resolvePath: any, options: DirectivesType = {}) {
  const items: DirectiveType[] = registerItems(directives, options, { directives });

  return items.map((item: DirectiveType) => {
    const name = Utils.object.getName(item, options);
    const opt = {
      ...item,
      name,
      from: resolvePath({ name, as: item.as, from: item.from, type: 'directive' })
    };

    return opt;
  });
}

function registerComposables(resolvePath: any, options: ComposablesType = {}) {
  const items: ComposableType[] = registerItems(composables, options, { composables });

  return items.map((item: ComposableType) => {
    const name = Utils.object.getName(item, options);
    const opt = {
      ...item,
      name,
      from: resolvePath({ name, as: item.as, from: item.from, type: 'composable' })
    };

    addImports(opt);

    return opt;
  });
}

function registerServices(resolvePath: any, components: ComponentType[] = []) {
  const services: any = new Set<string>();

  components.forEach((component) => component?.use && services.add(component.use.as));

  return [...services].map((service) => ({
    name: service,
    as: service,
    from: resolvePath({ name: service, as: service, from: `primevue/${service.toLowerCase()}`, type: 'service' })
  }));
}

function registerStyles(resolvePath: any, registered: any, options: any) {
  const styles: ItemType[] = [
    {
      name: 'BaseStyle',
      as: 'BaseStyle',
      from: resolvePath({ name: 'BaseStyle', as: 'BaseStyle', from: 'primevue/base/style', type: 'style' })
    }
  ];

  if (!options?.unstyled) {
    if (Utils.object.isNotEmpty(registered?.components)) {
      styles.push({
        name: 'BaseComponentStyle',
        as: 'BaseComponentStyle',
        from: resolvePath({ name: 'BaseComponentStyle', as: 'BaseComponentStyle', from: 'primevue/basecomponent/style', type: 'style' })
      });
    }

    [registered.components, registered.directives]
      .flat()
      .reduce((acc: any[], citem: any) => (acc.some((item) => item.as.toLowerCase() === citem.as.toLowerCase()) ? acc : [...acc, citem]), [])
      .forEach((item: any) =>
        styles.push({
          name: `${item.as}Style`,
          as: `${item.as}Style`,
          from: resolvePath({ name: `${item.as}Style`, as: `${item.as}Style`, from: `primevue/${item.as.toLowerCase()}/style`, type: 'style' })
        })
      );
  }

  return styles;
}

export function register(options: ModuleOptions) {
  const resolvePath = (resolveOptions: ResolvePathOptions) => Utils.object.getPath(options.resolvePath, resolveOptions);

  const config = registerConfig(resolvePath);
  const components = registerComponents(resolvePath, options.components);
  const directives = registerDirectives(resolvePath, options.directives);
  const composables = registerComposables(resolvePath, options.composables);
  const registered = {
    components,
    directives,
    composables
  };
  const services = registerServices(resolvePath, registered.components);
  const styles = registerStyles(resolvePath, registered, options.options);

  return {
    config,
    ...registered,
    services,
    styles
  };
}
