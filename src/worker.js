import { App } from 'astro/app';
import { handle } from '@astrojs/cloudflare/handler'

export function createExports(manifest) {
  const app = new App(manifest);
  return {
    default: {
      async fetch(request, env, ctx) {
        return handle(manifest, app, request, env, ctx);
      }
    }
  }
}