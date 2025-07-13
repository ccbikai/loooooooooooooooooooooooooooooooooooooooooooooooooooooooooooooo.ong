import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: cloudflare({
		imageService: "compile",
		workerEntryPoint: {
      path: 'src/worker.js',
    }
	}),
	integrations: [tailwind()],
});
