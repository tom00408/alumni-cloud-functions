import { onCall, HttpsError } from "firebase-functions/v2/https";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { getHtmlaufnahmeBestaetigung } from "../utils/getHtml";
import type { AufnahmeEmailData } from "../types/AufnahmeEmailData";


export const aufnahmeBestaetigung = onCall(
  {
    region: "europe-west3",
    memory: "512MiB",
    // Secrets freischalten (kommen aus Secret Manager oder .env/.secret.local im Emulator)
    secrets: ["USER_EMAIL", "USER_PASSWORT", "SMTP_SERVER", "SMTP_PORT"],
  },
  async (request) => {
    // Optional: nur eingeloggte Nutzer erlauben
    // if (!request.auth) throw new HttpsError("unauthenticated", "Login erforderlich.");

    const data = request.data as { aufnahmeEmailData: AufnahmeEmailData };
    if (!data?.aufnahmeEmailData) {
      throw new HttpsError("invalid-argument", "Fehlende Felder (aufnahmeEmailData).");
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

    const subject = data.aufnahmeEmailData.status === "approved"
      ? "Willkommen im Alumni-Verein des Hainberg-Gymnasiums Göttingen e.V.!"
      : "Mitgliedschaftsantrag beim Alumni-Verein des Hainberg-Gymnasiums Göttingen e.V.";


    const html = getHtmlaufnahmeBestaetigung(data.aufnahmeEmailData);

    const info = await transporter.sendMail({
      from: `"Alumni-Verein des Hainberg-Gymnasiums" <${mailUser}>`,
      to: data.aufnahmeEmailData.email,
      subject,
      html,
    });

   

    // Bei callable immer ein JSON-serialisierbares Objekt zurückgeben
    return { success: true, messageId: info.messageId };
  }
);
