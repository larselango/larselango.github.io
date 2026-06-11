import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "/" fordi siden bruker eget domene (perks.no).
// Hvis du i stedet hoster på brukernavn.github.io/perks/, sett base: "/perks/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
