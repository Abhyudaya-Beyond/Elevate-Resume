export const templatesList = [
  "academic",
  "azurill",
  "bronzor",
  "chikorita",
  "creative",
  "ditto",
  "executive",
  "gengar",
  "glalie",
  "government",
  "kakuna",
  "leafish",
  "minimalist",
  "nosepass",
  "onyx",
  "pikachu",
  "rhyhorn",
] as const;

export type Template = (typeof templatesList)[number];
