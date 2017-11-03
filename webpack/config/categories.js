export default {
  // Helpful because the name of the folders can be complex and have accents
  // Primary categories (Methode, Model, usecase)
  PRIMARY: {
    "1.méthodes": "idea",
    "2.modèles": "model",
    "3.cas-d-usages": "usecase"
  },
  // Used for display in the HTML
  PRIMARY_DISPLAY: {
    "idea":  "Méthode",
    "model": "Modèle de document",
    "usecase": "Cas d'usage"
  },

  SECONDARY: {
    "créativité": "creativite",
    "autres": "autres",
    "communication": "communication",
    "documentation": "documentation",
    "inventions": "inventions",
    "juridique": "juridique",
    "lieux et évènements": "lieux",
    "lieux et evènements": "lieux", // Because someone MIGHT rename it without accents, who knows, this is open source amaright?
    "marchés publics": "marches",
    "parangonnage": "parangonnage",
    "technologie": "technologies"
  },

  // Color schema for every category, if you add new ones, add here and also in the HTML below
  COLORS: {
    creativite: "applegreen",
    autres: "black",
    communication: "lightorange",
    documentation: "blue",
    inventions: "lightgreen",
    juridique: "darkpurple",
    lieux: "yellow",
    marches: "greenblue",
    parangonnage: "lightbrown",
    technologies: "purple"
  }
};
