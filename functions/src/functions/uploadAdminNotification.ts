import { onCall, HttpsError } from "firebase-functions/v2/https";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { getHtmlUploadAdminNotification } from "../utils/getHtml";
import type { UploadAdminNotificationData } from "../types/UploadAdminNotificationData";
export const uploadAdminNotification = onCall(
  {
    region: "europe-west3",
    memory: "512MiB",
    // Secrets freischalten (kommen aus Secret Manager oder .env/.secret.local im Emulator)
    secrets: ["USER_EMAIL", "USER_PASSWORT", "SMTP_SERVER", "SMTP_PORT"],
  },
  async (request) => {
    // Optional: nur eingeloggte Nutzer erlauben
    // if (!request.auth) throw new HttpsError("unauthenticated", "Login erforderlich.");

    const data = request.data as { uploadAdminNotificationData: UploadAdminNotificationData };
    if (!data?.uploadAdminNotificationData) {
      throw new HttpsError("invalid-argument", "Fehlende Felder (uploadAdminNotificationData).");
    }

    const mailUser = process.env.USER_EMAIL!;
    const mailPass = process.env.USER_PASSWORT!;
    const smtpHost = process.env.SMTP_SERVER!;
    const smtpPort = Number(process.env.SMTP_PORT ?? "587");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: mailUser, pass: mailPass },
    } as SMTPTransport.Options);

    const subject =`Es gibt einen neuen Upload von ${data.uploadAdminNotificationData.mitgliedName}`;
    const html = getHtmlUploadAdminNotification(data.uploadAdminNotificationData.text);

    const info = await transporter.sendMail({
      from: `"Alumni-Verein des Hainberg-Gymnasiums" <${mailUser}>`,
      to: "admin@alumni.hainberg-gymnasium.de",
      subject,
      html,
    });

   

    // Bei callable immer ein JSON-serialisierbares Objekt zurückgeben
    return { success: true, messageId: info.messageId };
  }
);
