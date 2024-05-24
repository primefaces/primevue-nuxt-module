import type { PrimeVueConfiguration } from 'primevue/config';
import type { ComponentsType } from './runtime/core/components/types';
import type { ComposablesType } from './runtime/core/composables/types';
import type { DirectivesType } from './runtime/core/directives/types';

export interface ModuleOptions {
  usePrimeVue?: boolean;
  resolvePath?: any;
  cssLayerOrder?: string;
  importPT?: ImportOptions;
  importTheme?: ImportOptions;
  options?: PrimeVueOptions;
  components?: ComponentsType;
  directives?: DirectivesType;
  composables?: ComposablesType;
}

export interface PrimeVueOptions extends PrimeVueConfiguration {}

export interface ImportOptions {
  as?: string;
  from: string;
}

export interface ResolvePathOptions {
  name?: string;
  as?: string;
  from: string;
  type?: 'config' | 'component' | 'directive' | 'composable' | 'service' | 'style' | undefined;
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    primevue?: ModuleOptions;
  }
  interface NuxtOptions {
    primevue?: ModuleOptions;
  }
}
