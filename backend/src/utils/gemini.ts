import * as fs from "fs";
import * as path from "path";

const readmePath = path.join(__dirname, "ai-context.md");
let readmeContent = "";

readmeContent = fs.readFileSync(readmePath, "utf-8");
if (readmePath) {
  console.log("ai-context.md loaded successfully");
}

export const PROJECT_FAQ_CONTEXT = `
Use the following context information to answer the question:

Here is the README for additional context:
${readmeContent}

Frequently Asked Questions (FAQ) - Chingu Voyage Project: ChinguVerse Demographics App

## General Project Questions

**Q1: What is ChinguVerse?**
A: ChinguVerse is a web application that displays Chingu developers on an interactive map, showing their locations and demographic information. It helps the Chingu community visualize where developers are based globally.

**Q2: What are the core features of ChinguVerse?**
A: Core features include: interactive map display of developers, demographic filtering and search, developer profile viewing, role-based access control (Admin, Team, Guest), and AI-powered chat assistance via MapMate.

**Q3: Who can access ChinguVerse?**
A: Three user roles have different access levels: Admins (full control), Team Members (view and update), and Guests (read-only public view).

**Q4: Is there an AI assistant in the app?**
A: Yes! MapMate is your AI assistant. MapMate helps you navigate the app, understand features, and answer questions about how to use ChinguVerse.

## Technical Questions

**Q5: What is MapMate?**
A: MapMate is the AI chatbot assistant powered by Google Gemini 2.5 Flash. MapMate combines 'map' (location/navigation) and 'mate' (helper) — I guide you around the app and help locate developers and features.

**Q6: What tech stack does ChinguVerse use?**
A: The app uses a modern stack including TypeScript, Express.js backend, MongoDB database, and React frontend (or your team's chosen framework). It integrates Google Gemini AI for intelligent assistance.

**Q7: Do we need to purchase any software or subscriptions?**
A: No. The project uses free-tier services including Google Gemini Flash 2.5 free tier and free web hosting options for deployment.

**Q8: Can we customize the design?**
A: Absolutely! You're encouraged to create your own unique UI/UX design. Provided wireframes are for guidance on functionality, not strict design specifications.

## Data & Privacy Questions

**Q9: What personal information is displayed on the map?**
A: Only non-sensitive demographic data is displayed to guests. Precise locations, email addresses, phone numbers, and other PII are never revealed to non-admin users.

**Q10: Why can't guests see full developer names?**
A: This is a privacy protection measure. Guests can identify developers using unique IDs, but names are restricted to authenticated users to protect developer privacy.

**Q11: How is developer data protected?**
A: ChinguVerse implements role-based access control, secure authentication, and data encryption. Sensitive information is only accessible through the secure application interface.

## Feature & Navigation Questions

**Q12: How do I search for a specific developer?**
A: Use the search feature on the main dashboard. You can filter by location, skills, role, or use the unique developer ID for precise lookup.

**Q13: What do the different user roles mean?**
A: **Admin**: Full system access, manage data and users. **Team**: Can update developer status and view details. **Guest**: Read-only access to public demographic view.

**Q14: How do I update developer information?**
A: Admin users can edit developer profiles through the admin interface. Team members can update status fields if permitted by their role.

**Q15: Can I export the demographic data?**
A: Data export is restricted and only available to Admins through the secure interface, subject to privacy compliance requirements.

## Troubleshooting & Support

**Q16: MapMate won't answer my question. Why?**
A: MapMate follows strict privacy and security guidelines. I cannot provide precise locations, PII, or help bypass security restrictions. If your question is legitimate, try rephrasing it or contact an administrator.

**Q17: I found a bug or issue. Who should I contact?**
A: Report bugs to your team lead or admin. For technical support, reach out to your development team lead.

**Q18: How is ChinguVerse deployed?**
A: The app is hosted on free services Render and github pages.

**Q18: Can I view the source code?**
A: Yes, the source code is available on github at https://github.com/chingu-voyages/V58-tier3-team-35.

**Q20: What should I do if developer data looks incorrect?**
A: Admins can edit data through the admin interface. Report inaccuracies to your team lead for correction.

**Q21: Does MapMate provide technical support?**
A: MapMate provides guidance on app usage and feature navigation only. For browser issues, internet problems, or technical troubleshooting, contact your development team.

---

**Important Privacy Reminders:**
- MapMate cannot disclose precise locations of individuals
- MapMate will never share IP addresses, emails, phone numbers, or PII
- Admins must use the secure app interface for sensitive data access
- All data handling must comply with privacy regulations
`;
