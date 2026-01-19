import { onCall, HttpsError } from "firebase-functions/v2/https";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { getHtmlPostAdminNotification } from "../utils/getHtml";
import type { PostNotificationData } from "../types/PostNotificationData";

export const postAdminNotification = onCall(
  {
    region: "europe-west3",
    memory: "512MiB",
    // Secrets freischalten (kommen aus Secret Manager oder .env/.secret.local im Emulator)
    secrets: ["USER_EMAIL", "USER_PASSWORT", "SMTP_SERVER", "SMTP_PORT"],
  },
  async (request) => {
    // Optional: nur eingeloggte Nutzer erlauben
    // if (!request.auth) throw new HttpsError("unauthenticated", "Login erforderlich.");

    const data = request.data as { postNotificationData: PostNotificationData };
    if (!data?.postNotificationData) {
      throw new HttpsError("invalid-argument", "Fehlende Felder (postNotificationData).");
    }

    const postData = data.postNotificationData;

    // Validierung der erforderlichen Felder
    if (!postData.mitgliedName || !postData.mitgliedEmail || !postData.postContent) {
      throw new HttpsError("invalid-argument", "Fehlende erforderliche Felder: mitgliedName, mitgliedEmail oder postContent.");
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

    const subject = postData.postTitle 
      ? `Neuer Beitrag von ${postData.mitgliedName}: ${postData.postTitle}`
      : `Neuer Beitrag von ${postData.mitgliedName}`;
    
    const html = getHtmlPostAdminNotification(postData);

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
