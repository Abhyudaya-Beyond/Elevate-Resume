/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
  base: "/artboard/",

  cacheDir: "../../node_modules/.vite/artboard",

  build: {
    sourcemap: true,
    emptyOutDir: true,
  },

  server: {
    host: true,
    port: 6173,
    fs: { allow: [searchForWorkspaceRoot(process.cwd())] },
  },

  plugins: [react(), nxViteTsPaths()],

  resolve: {
    alias: {
      "@/artboard/": `${searchForWorkspaceRoot(process.cwd())}/apps/artboard/src/`,
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
