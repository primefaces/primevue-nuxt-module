<!--
## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```
-->
# PrimeVue Nuxt Module

## Quick Setup

1. Add `@nuxtjs/primevue` dependency to your project

```bash
# Using pnpm
pnpm add -D @nuxtjs/primevue

# Using yarn
yarn add --dev @nuxtjs/primevue

# Using npm
npm install --save-dev @nuxtjs/primevue
```

2. Add `@nuxtjs/primevue` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/primevue'
  ]
})
```

That's it! You can now use My Module in your Nuxt app ✨
