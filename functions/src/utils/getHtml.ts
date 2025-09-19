import { AufnahmeEmailData } from "../types/AufnahmeEmailData";
import { SubmitEmailData } from "../types/SubmitEmailData";

export function getHtmlSubmitEmail(user: SubmitEmailData): string {
  return `
    <p>Hallo ${user.firstName} ${user.lastName},</p>
    <p>vielen Dank für Ihren Mitgliedsantrag beim Alumni-Verein des Hainberg-Gymnasiums Göttingen e.V.</p>
    <p>Ihr Antrag wird nun von unserem Team geprüft. Sobald Ihr Antrag bestätigt wurde, erhalten Sie eine weitere E-Mail mit allen wichtigen Informationen zu Ihrer Mitgliedschaft.</p>
    <p>Falls wir noch Rückfragen zu Ihrem Antrag haben, werden wir uns ebenfalls per E-Mail bei Ihnen melden.</p>
    <p>Mit freundlichen Grüßen,<br>Ihr Alumni-Verein-Team</p>

    <p>---------------------------------------------</p>
    <p>Hier noch einmal Ihre angegebenen Daten:</p>
    <ul>
      <li><strong>Anrede:</strong> ${user.salutation}</li>
      <li><strong>Vorname:</strong> ${user.firstName}</li>
      <li><strong>Nachname:</strong> ${user.lastName}</li>
      <li><strong>E-Mail:</strong> ${user.email}</li>
      <li><strong>Adresse:</strong> ${user.address}</li>
      <li><strong>Postleitzahl:</strong> ${user.postalCode}</li>
      <li><strong>Stadt:</strong> ${user.city}</li>
      <li><strong>Geburtsdatum:</strong> ${user.birthDate}</li>
    </ul>
    <p>---------------------------------------------</p>
    </ul>
  `;
}


export function getHtmlaufnahmeBestaetigung(user: AufnahmeEmailData): string {
  if (user.status === "approved") {
    return `
      <p>Hallo ${user.firstName} ${user.lastName},</p>
      <p>herzlichen Glückwunsch! Ihr Mitgliedsantrag beim Alumni-Verein des Hainberg-Gymnasiums Göttingen e.V. wurde genehmigt.</p>
      <p>Ihre Mitgliedsnummer lautet: <strong>${user.membershipNumber}</strong></p>
      <p>Wir freuen uns, Sie als neues Mitglied in unserem Verein begrüßen zu dürfen!</p>
      <p>Mit freundlichen Grüßen,<br>Ihr Alumni-Verein-Team</p>`
  } else {
    return `
      <p>Hallo ${user.firstName} ${user.lastName},</p>
      <p>vielen Dank für Ihren Mitgliedsantrag beim Alumni-Verein des Hainberg-Gymnasiums Göttingen e.V.</p>
      <p>Leider müssen wir Ihnen mitteilen, dass Ihr Antrag abgelehnt wurde. Falls Sie Fragen zu dieser Entscheidung haben, können Sie sich gerne per E-Mail an uns wenden.</p>
      <p>Mit freundlichen Grüßen,<br>Ihr Alumni-Verein-Team</p>`
  }
}