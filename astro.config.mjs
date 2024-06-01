import cloudflare from "@astrojs/cloudflare";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";
import zeabur from "@zeabur/astro-adapter/serverless";
import { defineConfig } from "astro/config";
import { provider } from "std-env";

const adapters = {
	cloudflare_pages: cloudflare(),
	netlify: netlify(),
	vercel: vercel(),
	zeabur: zeabur(),
	node: node({
		mode: "standalone",
	}),
};

// https://astro.build/config
export default defineConfig({
	adapter: adapters[provider] ?? adapters.node,
	output: "hybrid"
});
