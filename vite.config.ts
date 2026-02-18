import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'

const disablePrerender =
  process.env.DISABLE_PRERENDER === 'true' || process.env.VERCEL === '1'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ...(disablePrerender
      ? []
      : [
          prerender({
            routes: ['/'],
            renderer: '@prerenderer/renderer-puppeteer',
            rendererOptions: {
              maxConcurrentRoutes: 1,
              renderAfterTime: 3000,
            },
            postProcess(renderedRoute) {
              renderedRoute.html = renderedRoute.html.replace(
                /http:\/\/localhost:\d+/g,
                'https://cattlytx.com',
              )
            },
          }),
        ]),
  ],
})
