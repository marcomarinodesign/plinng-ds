import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      include: ["src"],
      exclude: [
        "src/main.tsx",
        "src/App.tsx",
        "src/test/**",
        "src/**/*.stories.tsx",
        "src/**/*.test.tsx",
        "src/**/*.figma.tsx",
      ],
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
  // No copiar public/ al dist en modo librería (vite.svg no va al paquete npm)
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PlinngDS",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      // Externaliza dependencias que el consumidor debe tener instaladas
      external: ["react", "react-dom", "react/jsx-runtime", "lucide-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
          "lucide-react": "LucideReact",
        },
        // CSS con nombre predecible (no hasheado)
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "index.css";
          return assetInfo.name ?? "assets/[name][extname]";
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
