import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import VueRouter from "unplugin-vue-router/vite";
import Layouts from "vite-plugin-vue-layouts";
import { log } from "node:console";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  log(`当前模式：${mode}`);
  return {
    plugins: [
      VueRouter({
        routesFolder: {
          src: "src/views",
          path: "",
        },
        dts: "src/types/typed-router.d.ts",
        extendRoute: (route) => {
          route.name = route.name.replace(/^\/+/, "").replace(/\//g, "_");
        },
      }),

      vue(),
      Layouts({
        pagesDirs: [],
      }),
      vueJsx(),
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
        dts: "./src/types/auto-imports.d.ts",
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: "./src/types/components.d.ts",
      }),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: Number(env.VITE_PORT),
      open: true,
      proxy: {
        "/api": {
          target: "http://localhost:9900",
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(/\/api/, "");
          },
        },
        "/ws-api": {
          target: "ws://localhost:9900",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => {
            return path.replace(/\/ws-api/, "");
          },
        },
      },
    },
  };
});
