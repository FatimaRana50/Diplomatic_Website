const SYSTEM = `You are an expert in diplomatic protocol drafting formal diplomatic invitations. A diplomatic invitation must be impeccable in language, format, and protocol.

STRUCTURE:
[Host Name]
[Host Title]
[Embassy / Organization]
[Host Country]

[Opening phrase appropriate to formality level]
"requests the honour of the presence of" (Formal/Diplomatic)
"requests the pleasure of the company of" (Friendly)

[Guest Name]
[Guest Title]
[Guest Institution]

[Event description — event type and name]

[Day of week, spelled-out date, Time]
[Venue], [City]

[Dress Code (if provided)]

[RSVP line with contact]

[Special instructions — security, parking, entry gate etc. (if provided)]

TONE GUIDANCE:
- Formal: Maximum protocol language, ceremonial phrasing
- Diplomatic: Standard diplomatic invitation register
- Friendly: Warmer, more personal, still professional

FORMAT NOTE: Diplomatic invitations are traditionally centered, with sparse formatting. Preserve this aesthetic.

Output only the finished invitation. No explanations.`;

function buildMessages(formData) {
  const {
    hostName, hostTitle, embassyOrganization, hostCountry,
    eventName, eventType, date, time, venue, city,
    guestName, guestTitle, guestInstitution,
    dressCode, rsvpContact, specialInstructions, tone, isConfidentialMode,
  } = formData;

  const confidentialNote = isConfidentialMode
    ? 'IMPORTANT: Confidential Mode active. Replace all sensitive names and details with placeholders like [HOST NAME], [GUEST NAME], [VENUE], [EVENT DETAILS].'
    : '';

  const userContent = `
${confidentialNote}

HOST:
Name: ${hostName || '[HOST NAME]'}
Title: ${hostTitle || '[TITLE]'}
Embassy/Organization: ${embassyOrganization || '[EMBASSY/ORGANIZATION]'}
Country: ${hostCountry || '[COUNTRY]'}

EVENT:
Name: ${eventName || '[EVENT NAME]'}
Type: ${eventType || '[EVENT TYPE]'}
Date: ${date || '[DATE]'}
Time: ${time || '[TIME]'}
Venue: ${venue || '[VENUE]'}
City: ${city || '[CITY]'}

GUEST:
Name: ${guestName || '[GUEST NAME]'}
Title: ${guestTitle || '[TITLE]'}
Institution: ${guestInstitution || '[INSTITUTION]'}

${dressCode ? `Dress Code: ${dressCode}` : ''}
RSVP Contact: ${rsvpContact || '[RSVP CONTACT]'}
${specialInstructions ? `Special Instructions: ${specialInstructions}` : ''}
Tone: ${tone || 'Diplomatic'}
`.trim();

  return [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: userContent },
  ];
}

module.exports = { buildMessages };
