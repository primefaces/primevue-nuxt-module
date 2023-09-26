import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';

import PrimeVue from 'primevue/config';
import BadgeDirective from 'primevue/badgedirective';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import Tooltip from 'primevue/tooltip';
import FocusTrap from 'primevue/focustrap';

import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin(({ vueApp }) => {
  const runtimeConfig = useRuntimeConfig();
  const config: any = runtimeConfig?.public?.primevue ?? {};
  const { options = {}, components = [], directives = [] } = config;
  const services = new Set();

  vueApp.use(PrimeVue, options);

  components.forEach((component) => services.add(component?.use?.as));
  services.forEach((service) => {
    switch (service) {
      case 'ConfirmationService':
        vueApp.use(ConfirmationService);
        break;

      case 'DialogService':
        vueApp.use(DialogService);
        break;

      case 'ToastService':
        vueApp.use(ToastService);
        break;

      default:
        break;
    }
  });

  directives.forEach((directive) => {
    switch (directive.as) {
      case 'BadgeDirective':
        vueApp.directive(directive.name, BadgeDirective);
        break;

      case 'Tooltip':
        vueApp.directive(directive.name, Tooltip);
        break;

      case 'Ripple':
        vueApp.directive(directive.name, Ripple);
        break;

      case 'StyleClass':
        vueApp.directive(directive.name, StyleClass);
        break;

      case 'FocusTrap':
        vueApp.directive(directive.name, FocusTrap);
        break;

      default:
        break;
    }
  });
});
