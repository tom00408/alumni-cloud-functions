import { onCall, HttpsError } from "firebase-functions/v2/https";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { getHtmlSubmitEmail } from "../utils/getHtml";
import type { SubmitEmailData } from "../types/SubmitEmailData"; 

export const eingangsBestaetigung = onCall(
  {
    region: "europe-west3",
    memory: "512MiB",
    // Secrets freischalten (kommen aus Secret Manager oder .env/.secret.local im Emulator)
    secrets: ["USER_EMAIL", "USER_PASSWORT", "SMTP_SERVER", "SMTP_PORT"],
  },
  async (request) => {
    // Optional: nur eingeloggte Nutzer erlauben
    // if (!request.auth) throw new HttpsError("unauthenticated", "Login erforderlich.");

    const data = request.data as { submitEmailData: SubmitEmailData };
    if (!data?.submitEmailData) {
      throw new HttpsError("invalid-argument", "Fehlende Felder (submitEmailData).");
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

    const subject ="Bestätigung ihres Mitgliedsantrags beim Alumniverein des Hainberg-Gymnasiums Göttingen e.V.";
    const html = getHtmlSubmitEmail(data.submitEmailData);

    const info = await transporter.sendMail({
      from: `"Alumni-Verein des Hainberg-Gymnasiums" <${mailUser}>`,
      to: data.submitEmailData.email,
      subject,
      html,
    });

   

    // Bei callable immer ein JSON-serialisierbares Objekt zurückgeben
    return { success: true, messageId: info.messageId };
  }
);
