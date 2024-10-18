import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  tsconfig: "tsconfig.json",
  outDir: "dist",
  clean: true,
  format: ["cjs"],
  noExternal: ["src"],
});
