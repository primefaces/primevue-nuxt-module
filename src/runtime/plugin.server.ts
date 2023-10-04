import type { NitroApp } from 'nitropack';
// @ts-expect-error
import { importStyleModules } from '#primevue-style';
//import { useRuntimeConfig } from '#imports';

type NitroAppPlugin = (nitro: NitroApp) => void;

const defineNitroPlugin = (def: NitroAppPlugin): NitroAppPlugin => def;

export default defineNitroPlugin(async (nitroApp) => {
  let styles: string = '';

  try {
    styles = await importStyleModules();
  } catch (error) {
    console.error('PrimeVue Nitro Plugin: ', error);
  }

  nitroApp.hooks.hook('render:html' as any, (html) => {
    html.head.push(styles);
  });
});
