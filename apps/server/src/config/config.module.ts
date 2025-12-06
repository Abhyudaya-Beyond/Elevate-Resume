import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";

import appConfig from "./app.config";
import mailConfig from "./mail.config";
import { configSchema } from "./schema";

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validate: (config) => configSchema.parse(config),
      load: [appConfig, mailConfig],
    }),
  ],
})
export class ConfigModule {}
