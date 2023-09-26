import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html' as any, (html) => {
    html.head.push(`<style>div{ background: red }</style>`);
  });
});
