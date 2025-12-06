import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import session from "express-session";
import type { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { patchNestJsSwagger } from "nestjs-zod";

import { AppModule } from "./app.module";
import type { Config } from "./config/schema";

patchNestJsSwagger();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === "development" ? ["debug"] : ["error", "warn", "log"],
  });

  const configService = app.get(ConfigService<Config>);

  const accessTokenSecret = configService.getOrThrow("ACCESS_TOKEN_SECRET");
  const publicUrl = configService.getOrThrow("PUBLIC_URL");
  const isHTTPS = publicUrl.startsWith("https://") ?? false;

  // Cookie Parser
  app.use(cookieParser());

  // Session
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: accessTokenSecret,
      cookie: { httpOnly: true, secure: isHTTPS },
    }),
  );

  // CORS
  app.enableCors({
    credentials: true,
    origin: process.env.NODE_ENV === "development" ? true : publicUrl,
  });

  // Helmet - Security headers with modern configuration
  if (isHTTPS) {
    app.use(
      helmet({
        contentSecurityPolicy: false,
        // Use modern CSP frame-ancestors instead of deprecated X-Frame-Options
        frameguard: false, // Disable X-Frame-Options (we'll use CSP instead)
        // Remove deprecated X-XSS-Protection header
        xssFilter: false, // Modern browsers handle this natively
        // Use Cache-Control instead of Expires
        noSniff: true,
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        },
      }),
    );
    
    // Set modern security headers
    app.use((req: Request, res: Response, next: NextFunction) => {
      // Use CSP frame-ancestors instead of X-Frame-Options
      res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
      
      // Use Cache-Control instead of Expires for static assets
      if (req.path.startsWith("/artboard") || req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      }
      
      next();
    });
  }

  // Global Prefix
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  // Enable Shutdown Hooks
  app.enableShutdownHooks();

  // Swagger (OpenAPI Docs)
  // This can be accessed by visiting {SERVER_URL}/api/docs
  const config = new DocumentBuilder()
    .setTitle("Elevate")
    .setDescription(
      "Elevate is a privacy-first resume builder that helps you tell your story with full control over your data.",
    )
    .addCookieAuth("Authentication", { type: "http", in: "cookie", scheme: "Bearer" })
    .setVersion("4.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // Port
  const port = configService.get<number>("PORT") ?? 3000;

  await app.listen(port);

  Logger.log(`🚀 Server is up and running on port ${port}`, "Bootstrap");
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void bootstrap();
