import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';

import PrimeVue from 'primevue/config';

export default defineNuxtPlugin(({ vueApp }) => {
  const runtimeConfig = useRuntimeConfig();
  const config: any = runtimeConfig?.public?.primevue ?? {};
  const { usePrimeVue = true, options = {}, components = [], directives = [] } = config;
  const services = new Set();

  usePrimeVue && vueApp.use(PrimeVue, options);

  components.forEach((component: any) => component?.use && services.add(component.use.as));
  services.forEach((service) => {
    switch (service) {
      case 'ConfirmationService':
        vueApp.use(async () => await import('primevue/confirmationservice'));
        break;

      case 'DialogService':
        vueApp.use(async () => await import('primevue/dialogservice'));
        break;

      case 'ToastService':
        vueApp.use(async () => await import('primevue/toastservice'));
        break;

      default:
        break;
    }
  });

  directives.forEach((directive: any) => {
    switch (directive.as) {
      case 'BadgeDirective':
        vueApp.directive(directive.name, async () => await import('primevue/badgedirective'));
        break;

      case 'Tooltip':
        vueApp.directive(directive.name, async () => await import('primevue/tooltip'));
        break;

      case 'Ripple':
        vueApp.directive(directive.name, async () => await import('primevue/ripple'));
        break;

      case 'StyleClass':
        vueApp.directive(directive.name, async () => await import('primevue/styleclass'));
        break;

      case 'FocusTrap':
        vueApp.directive(directive.name, async () => await import('primevue/focustrap'));
        break;

      default:
        break;
    }
  });
});
