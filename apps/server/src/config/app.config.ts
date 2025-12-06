import { registerAs } from "@nestjs/config";

export interface AppConfig {
  name: string;
  description: string;
  tagline: string;
  url: string;
  port: number;
  environment: "development" | "staging" | "production";
}

export default registerAs("app", (): AppConfig => ({
  name: process.env.APP_NAME || "Elevate",
  description:
    process.env.APP_DESCRIPTION ||
    "Your resume. Your story. Your control.",
  tagline:
    process.env.APP_TAGLINE ||
    "Your resume. Your story. Your control.",
  url: process.env.PUBLIC_URL || "http://localhost:3000",
  port: Number.parseInt(process.env.PORT || "3000", 10),
  environment: (process.env.NODE_ENV as AppConfig["environment"]) || "development",
}));


