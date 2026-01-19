import { AufnahmeEmailData } from "../types/AufnahmeEmailData";
import { SubmitEmailData } from "../types/SubmitEmailData";
import { PostNotificationData } from "../types/PostNotificationData";

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


export function getHtmlUploadAdminNotification(text: string): string {
  return `
    <p>Hallo,</p>
    <p>${text}</p>
    <p>Mit freundlichen Grüßen,<br>Ihr Alumni-Verein-Team</p>
  `;
}

export function getHtmlPostAdminNotification(postData: PostNotificationData): string {
  const titleSection = postData.postTitle 
    ? `<h2>${postData.postTitle}</h2>`
    : '<h2>Neuer Beitrag von Mitglied</h2>';
  
  const imageSection = postData.imageUrl 
    ? `
    <div style="margin: 15px 0;">
      <img src="${postData.imageUrl}" alt="Beitragsbild" style="max-width: 100%; height: auto; border-radius: 5px; border: 1px solid #ddd;" />
    </div>
    `
    : '';
  
  return `
    <p>Hallo Admin,</p>
    <p>Es wurde ein neuer Beitrag von einem Mitglied veröffentlicht:</p>
    ${titleSection}
    <p><strong>Von:</strong> ${postData.mitgliedName} (${postData.mitgliedEmail})</p>
    <hr>
    ${imageSection}
    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
      <p><strong>Beitragsinhalt:</strong></p>
      <p>${postData.postContent.replace(/\n/g, '<br>')}</p>
    </div>
    ${postData.postId ? `<p><small>Post-ID: ${postData.postId}</small></p>` : ''}
    <p>Bitte überprüfen Sie den Beitrag im Admin-Bereich.</p>
    <p>Mit freundlichen Grüßen,<br>Ihr Alumni-Verein-Team</p>
  `;
}