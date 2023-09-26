import type { PrimeVueConfiguration } from 'primevue/config';
import type { ComponentsType } from './runtime/core/components/types';
import type { DirectivesType } from './runtime/core/directives/types';
import type { ComposablesType } from './runtime/core/composables/types';

export interface ModuleOptions {
  options?: PrimeVueConfiguration;
  components?: ComponentsType;
  directives?: DirectivesType;
  composables?: ComposablesType;
}
