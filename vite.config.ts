import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@lineiconshq/free-icons": "@lineiconshq/free-icons/dist/index.esm.js",
      "@lineiconshq/react-lineicons": "@lineiconshq/react-lineicons/dist/index.esm.js",
    },
  },
  ssr: {
    noExternal: ["@lineiconshq/free-icons", "@lineiconshq/react-lineicons"],
  },
});
