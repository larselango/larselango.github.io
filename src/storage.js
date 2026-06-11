/* =====================================================================
   perks – LAGRING  (teknisk – du trenger ikke endre denne fila)
   ---------------------------------------------------------------------
   På den hostede siden bruker vi nettleserens localStorage til å huske
   brukerens valg og om de har meldt seg på. Dette lagres KUN i brukerens
   egen nettleser – ingenting sendes til oss her. (E-postpåmeldinger
   sendes til EmailOctopus, se subscribe() i Perks.jsx.)

   API-et er bevisst likt det gamle window.storage, så resten av koden
   slapp å endres. Feil svelges stille (try/catch) – f.eks. hvis en
   bruker har blokkert lagring.
   ===================================================================== */
export const storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? null : { key, value };
    } catch {
      return null;
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(key, value);
      return { key, value };
    } catch {
      return null;
    }
  },
  async delete(key) {
    try {
      localStorage.removeItem(key);
      return { key, deleted: true };
    } catch {
      return null;
    }
  },
};
