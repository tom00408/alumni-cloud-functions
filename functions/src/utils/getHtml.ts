import { User } from "../types/user";

export function getHtml(user: User): string {
  return `
    <p>Hallo ${user.firstName} ${user.lastName},</p>
    <p>vielen Dank für Ihren Mitgliedsantrag beim Alumni-Verein des Hainberg-Gymnasiums Göttingen e.V.</p>
    <p>Ihr Antrag wird nun von unserem Team geprüft. Sobald Ihr Antrag bestätigt wurde, erhalten Sie eine weitere E-Mail mit allen wichtigen Informationen zu Ihrer Mitgliedschaft.</p>
    <p>Falls wir noch Rückfragen zu Ihrem Antrag haben, werden wir uns ebenfalls per E-Mail bei Ihnen melden.</p>
    <p>Mit freundlichen Grüßen,<br>Ihr Alumni-Verein-Team</p>

    <p>---------------------------------------------</p>
    <p>Hier noch einmal Ihre angegebenen Daten:</p>
    <ul>
      <li><strong>Name:</strong> ${user.firstName} ${user.lastName}</li>
      <li><strong>E-Mail:</strong> ${user.email}</li>
      <li><strong>Telefon:</strong> ${user.phone}</li>
      <li><strong>Straße:</strong> ${user.street}</li>
      <li><strong>PLZ & Ort:</strong> ${user.postalCode} ${user.city}</li>
    </ul>
  `;
}