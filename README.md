# Alumni Verein Cloud Functions

Firebase Cloud Functions für die Alumni-Website des Hainberg-Gymnasiums Göttingen e.V.

## 📋 Übersicht

Dieses Projekt enthält Firebase Cloud Functions, die automatisierte E-Mail-Benachrichtigungen für den Alumni-Verein verwalten. Die Functions handhaben verschiedene Phasen des Mitgliedschaftsprozesses durch personalisierte E-Mail-Kommunikation.

## 🚀 Verfügbare Functions

### `eingangsBestaetigung`
- **Zweck**: Sendet eine Bestätigungs-E-Mail nach dem Einreichen eines Mitgliedsantrags
- **Typ**: Callable Function
- **Region**: europe-west3
- **Betreff**: "Bestätigung ihres Mitgliedsantrags beim Alumniverein des Hainberg-Gymnasiums Göttingen e.V."

### `aufnahmeBestaetigung`
- **Zweck**: Sendet E-Mails zur Bestätigung der Mitgliedschaftsentscheidung (Annahme oder Ablehnung)
- **Typ**: Callable Function
- **Region**: europe-west3
- **Betreff**: Dynamisch basierend auf dem Status (Willkommen bei Annahme)

## 🛠 Technologie-Stack

- **Runtime**: Node.js 22
- **Framework**: Firebase Functions v2
- **Sprache**: TypeScript
- **E-Mail-Service**: Nodemailer mit SMTP
- **Build-Tool**: TypeScript Compiler

## 📦 Abhängigkeiten

### Production Dependencies
- `firebase-admin`: ^13.5.0
- `firebase-functions`: ^6.4.0
- `nodemailer`: ^7.0.6

### Development Dependencies
- `@types/nodemailer`: ^6.4.17
- `firebase-functions-test`: ^3.1.0
- `typescript`: ^5.7.3

## 🔧 Setup & Installation

### Voraussetzungen
- Node.js 22 oder höher
- Firebase CLI
- Ein Firebase-Projekt (`alumniwebsite-8dbf2`)

### Installation
```bash
# Repository klonen
git clone <repository-url>
cd AlumniCloudFuntions

# In das functions-Verzeichnis wechseln
cd functions

# Abhängigkeiten installieren
npm install
```

### Umgebungsvariablen
Die folgenden Secrets müssen im Firebase Secret Manager konfiguriert werden:

- `USER_EMAIL`: E-Mail-Adresse für den SMTP-Versand
- `USER_PASSWORT`: Passwort für den E-Mail-Account
- `SMTP_SERVER`: SMTP-Server-Adresse
- `SMTP_PORT`: SMTP-Port (Standard: 587)

```bash
#Beispiel

firebase function:secrets:set USER_EMAIL
#Danach die Email eingeben
```

Für lokale Entwicklung können diese in `.env.local` oder `.secret.local` definiert werden.

## 🔨 Verfügbare Scripts

```bash
# TypeScript kompilieren
npm run build

# Build im Watch-Modus
npm run build:watch

# Lokalen Emulator starten
npm run serve

# Functions Shell öffnen
npm run shell
npm run start

# Functions deployen
npm run deploy

# Logs anzeigen
npm run logs
```

## 🏗 Projektstruktur

```
functions/
├── src/
│   ├── functions/
│   │   ├── eingangsBestaetigung.ts    # Eingangsbestätigung Function
│   │   └── aufnahmeBestaetigung.ts    # Aufnahmebestätigung Function
│   ├── types/
│   │   ├── AufnahmeEmailData.ts       # Typen für Aufnahme-E-Mails
│   │   └── SubmitEmailData.ts         # Typen für Eingangs-E-Mails
│   ├── utils/
│   │   └── getHtml.ts                 # HTML-Template-Generierung
│   └── index.ts                       # Function Exports
├── lib/                               # Kompilierte JavaScript-Dateien
├── package.json
└── tsconfig.json
```

## 🚀 Deployment

### Lokale Entwicklung
```bash
# Emulator starten
npm run serve
```
Die Functions sind dann unter `http://localhost:5001/alumniwebsite-8dbf2/europe-west3/` erreichbar.

### Production Deployment
```bash
# Alle Functions deployen
npm run deploy

# Oder spezifische Function deployen
firebase deploy --only functions:eingangsBestaetigung
firebase deploy --only functions:aufnahmeBestaetigung
```

## 📧 E-Mail Templates

Die E-Mail-Templates werden in `src/utils/getHtml.ts` generiert und enthalten:
- Personalisierte Anreden
- Alumni-Verein Branding
- Statusspezifische Inhalte
- Kontaktinformationen

## 🔍 Monitoring & Debugging

```bash
# Function Logs anzeigen
npm run logs

# Spezifische Function Logs
firebase functions:log --only eingangsBestaetigung
firebase functions:log --only aufnahmeBestaetigung
```

## 🤝 Beitragen

1. Branch erstellen: `git checkout -b feature/neue-funktion`
2. Änderungen committen: `git commit -am 'Neue Funktion hinzufügen'`
3. Branch pushen: `git push origin feature/neue-funktion`
4. Pull Request erstellen

## 📝 Lizenz

Dieses Projekt ist für den Alumni-Verein des Hainberg-Gymnasiums Göttingen e.V. entwickelt.

## 📞 Kontakt

Bei Fragen oder Problemen wenden Sie sich an das Entwicklungsteam des Alumni-Vereins.

email: tom00408[a]aol.com
