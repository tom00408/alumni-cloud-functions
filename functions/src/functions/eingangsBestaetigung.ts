import * as functions from "firebase-functions";
import nodemailer from "nodemailer";         // mit "esModuleInterop": true
import type SMTPTransport from "nodemailer/lib/smtp-transport";

const mailUser = process.env.USER_EMAIL;
const mailPass = process.env.USER_PASSWORT;
const smtpHost = process.env.SMTP_SERVER;

// Transport (typisiert, damit host/port akzeptiert werden)
const transporter = nodemailer.createTransport(
  {
    host: smtpHost,
    port: 587,
    secure: false,
    auth: { user: mailUser, pass: mailPass },
  } as SMTPTransport.Options
);

export const eingangsBestaetigung = functions.https.onRequest(async (req, res): Promise<void> => {
  // CORS (minimal)
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(204).send(""); return; }
  if (req.method !== "POST") { res.status(405).send("Nur POST erlaubt"); return; }

  try {
    // Erwarteter Body:
    // { to: string, subject: string, html?: string, filename: string, pdfBase64: string, name?: string }
    const { to, name,  filename, pdfBase64 } = req.body as {
      to: string; name: string;  filename: string; pdfBase64: string;
    };

    if (!to || !name || !filename || !pdfBase64) {
      res.status(400).json({ success: false, error: "Fehlende Felder (to, subject, filename, pdfBase64)." });
      return;
    }

    // Daten-URL-Präfix entfernen, falls vorhanden (z. B. "data:application/pdf;base64,....")
    const base64 = pdfBase64.includes(",") ? pdfBase64.split(",")[1] : pdfBase64;

    // Größencheck (HTTP-Body-Limit beachten; hier weiches Limit ~7–8 MB)
    // Base64 hat ca. 4/3 Overhead → 8 MB Base64 ≈ 6 MB binär
    if (base64.length > 8 * 1024 * 1024) {
      res.status(413).json({ success: false, error: "PDF zu groß (Base64 > 8 MB)." });
      return;
    }

    // In Buffer dekodieren
    const pdfBuffer = Buffer.from(base64, "base64");

    const subject = `Ihre Bestellung vom MTV Geismar Shop`;

    const html = `
      <p>Hallo ${name},</p>
      <p>vielen Dank für Ihre Bestellung im MTV Geismar Shop!</p>
      <p>Im Anhang finden Sie Ihre Rechnung als PDF.</p>
      <p>Mit freundlichen Grüßen,<br>Ihr MTV Geismar Team</p>
    `;

    const info = await transporter.sendMail({
      from: `"MTV Geismar Shop" <${mailUser}>`,
      to,
      subject,
      html: html,
      attachments: [
        {
          filename: filename.endsWith(".pdf") ? filename : `${filename}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    res.json({ success: true, info });
    return;
  } catch (err: any) {
    res.status(500).json({ success: false, error: String(err?.message ?? err) });
    return;
  }
});
