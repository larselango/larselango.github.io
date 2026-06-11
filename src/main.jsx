import React from "react";
import { createRoot } from "react-dom/client";
import Perks from "./Perks.jsx";

// Fjern statisk reserve-innhold (for søkemotorer/uten JS) før appen monteres.
const root = document.getElementById("root");
root.innerHTML = "";
createRoot(root).render(
  <React.StrictMode>
    <Perks />
  </React.StrictMode>
);
