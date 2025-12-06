/// <reference types='vitest' />

import { lingui } from "@lingui/vite-plugin";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/client",

  build: {
    sourcemap: true,
    emptyOutDir: true,
  },

  define: {
    appVersion: JSON.stringify(process.env.npm_package_version),
  },

  server: {
    host: true,
    port: 5173,
    fs: { allow: [searchForWorkspaceRoot(process.cwd())] },

    proxy: {
      "/artboard": {
        target: "http://localhost:6173",
        changeOrigin: true,
      },
    },
  },

  optimizeDeps: {
    exclude: ["sanitize-html"], // Exclude from client bundle
    esbuildOptions: {
      loader: {
        ".po": "text",
      },
    },
  },
  
  ssr: {
    noExternal: ["sanitize-html"], // Keep in SSR if needed
  },

  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    lingui(),
    nxViteTsPaths(),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },

  resolve: {
    alias: {
      "@/client/": `${searchForWorkspaceRoot(process.cwd())}/apps/client/src/`,
      // Replace sanitize-html with browser-compatible stub
      "sanitize-html": `${searchForWorkspaceRoot(process.cwd())}/apps/client/src/utils/sanitize-stub.ts`,
      // Elevate package aliases
      "@elevate/dto": `${searchForWorkspaceRoot(process.cwd())}/libs/dto/src/index.ts`,
      "@elevate/hooks": `${searchForWorkspaceRoot(process.cwd())}/libs/hooks/src/index.ts`,
      "@elevate/parser": `${searchForWorkspaceRoot(process.cwd())}/libs/parser/src/index.ts`,
      "@elevate/schema": `${searchForWorkspaceRoot(process.cwd())}/libs/schema/src/index.ts`,
      "@elevate/ui": `${searchForWorkspaceRoot(process.cwd())}/libs/ui/src/index.ts`,
      "@elevate/utils": `${searchForWorkspaceRoot(process.cwd())}/libs/utils/src/index.ts`,
    },
  },
});
