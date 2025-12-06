import { registerAs } from "@nestjs/config";

export interface MailConfig {
  from: string;
  fromName: string;
  replyTo: string;
  supportEmail: string;
  supportUrl: string;
}

export default registerAs("mail", (): MailConfig => ({
  from: process.env.MAIL_FROM_EMAIL || "noreply@elevate.local",
  fromName: process.env.MAIL_FROM_NAME || "Elevate",
  replyTo: process.env.MAIL_REPLY_TO || "support@elevate.local",
  supportEmail: process.env.MAIL_SUPPORT_EMAIL || "support@elevate.local",
  supportUrl: process.env.MAIL_SUPPORT_URL || "https://elevate.local/support",
}));


