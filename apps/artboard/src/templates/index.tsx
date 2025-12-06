import type { Template } from "@elevate/utils";

import { Academic } from "./academic";
import { Azurill } from "./azurill";
import { Bronzor } from "./bronzor";
import { Chikorita } from "./chikorita";
import { Creative } from "./creative";
import { Ditto } from "./ditto";
import { Executive } from "./executive";
import { Gengar } from "./gengar";
import { Glalie } from "./glalie";
import { Government } from "./government";
import { Kakuna } from "./kakuna";
import { Leafish } from "./leafish";
import { Minimalist } from "./minimalist";
import { Nosepass } from "./nosepass";
import { Onyx } from "./onyx";
import { Pikachu } from "./pikachu";
import { Rhyhorn } from "./rhyhorn";

export const getTemplate = (template: Template) => {
  switch (template) {
    case "azurill": {
      return Azurill;
    }
    case "bronzor": {
      return Bronzor;
    }
    case "chikorita": {
      return Chikorita;
    }
    case "ditto": {
      return Ditto;
    }
    case "gengar": {
      return Gengar;
    }
    case "glalie": {
      return Glalie;
    }
    case "kakuna": {
      return Kakuna;
    }
    case "leafish": {
      return Leafish;
    }
    case "minimalist": {
      return Minimalist;
    }
    case "executive": {
      return Executive;
    }
    case "creative": {
      return Creative;
    }
    case "academic": {
      return Academic;
    }
    case "government": {
      return Government;
    }
    case "nosepass": {
      return Nosepass;
    }
    case "onyx": {
      return Onyx;
    }
    case "pikachu": {
      return Pikachu;
    }
    case "rhyhorn": {
      return Rhyhorn;
    }
    default: {
      return Onyx;
    }
  }
};
