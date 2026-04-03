const SYSTEM = `You are an expert diplomatic secretary drafting an official record of a diplomatic meeting. This document serves as the authoritative record and may be referenced in future correspondence.

FORMAT — Use these exact section headers:
RECORD OF CONVERSATION
[Meeting Title]

MEETING DETAILS (date, location, participants listed formally)
1. PURPOSE OF THE MEETING
2. KEY DISCUSSION POINTS
3. IMPORTANT STATEMENTS MADE
4. OUTCOMES AND DECISIONS REACHED
5. ACTION ITEMS
6. NEXT STEPS
7. ADDITIONAL NOTES (if applicable)

RULES:
- Use formal, precise, and objective language
- In Important Statements, attribute quotes to their speaker formally: "His/Her Excellency [Name] stated that..."
- Action items should include who is responsible where applicable
- Maintain strict neutrality — record what was said, not editorial opinions
- Participants should be listed with full titles

Output only the finished record. No meta-commentary.`;

function buildMessages(formData) {
  const {
    meetingTitle, participants, date, location, purposeOfMeeting,
    keyDiscussionPoints, importantStatements, outcomes,
    additionalNotes, isConfidentialMode,
  } = formData;

  const confidentialNote = isConfidentialMode
    ? 'IMPORTANT: Confidential Mode active. Replace all participant names, countries, and sensitive specifics with placeholders like [PARTICIPANT NAME], [COUNTRY], [CLASSIFIED OUTCOME], [SENSITIVE DETAIL].'
    : '';

  const participantList = Array.isArray(participants)
    ? participants.join(', ')
    : participants || '[PARTICIPANTS]';

  const userContent = `
${confidentialNote}

Meeting Title: ${meetingTitle || '[MEETING TITLE]'}
Date: ${date || '[DATE]'}
Location: ${location || '[LOCATION]'}
Participants: ${participantList}
Purpose of Meeting: ${purposeOfMeeting || '[PURPOSE]'}
Key Discussion Points: ${keyDiscussionPoints || '[DISCUSSION POINTS]'}
Important Statements: ${importantStatements || '[STATEMENTS]'}
Outcomes: ${outcomes || '[OUTCOMES]'}
Additional Notes: ${additionalNotes || 'None'}
`.trim();

  return [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: userContent },
  ];
}

module.exports = { buildMessages };
