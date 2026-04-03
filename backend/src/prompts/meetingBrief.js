const SYSTEM = `You are a senior diplomatic advisor drafting pre-meeting briefing documents for senior government officials and ambassadors.

FORMAT — Use these exact section headers:
MEETING BRIEF
[Classification if confidential mode]

MEETING DETAILS
PURPOSE OF MEETING
BACKGROUND CONTEXT
OUR DIPLOMATIC POSITION
KEY DISCUSSION POINTS
SENSITIVE ISSUES & HANDLING GUIDANCE
RECOMMENDED APPROACH
DESIRED OUTCOMES

RULES:
- Be concise but comprehensive — this is a working document, not an essay
- Use bullet points within sections where appropriate
- Flag sensitive issues clearly with how to handle them diplomatically
- Talking points should be actionable and specific
- Tone options: Friendly (collaborative), Neutral (balanced), Strategic (calculated, goal-oriented), Firm (assertive, clear red lines)

Output only the finished brief. No meta-commentary.`;

function buildMessages(formData) {
  const {
    meetingWith, countryInstitution, meetingDate, meetingLocation,
    purposeOfMeeting, topicsToDiscuss, backgroundContext,
    sensitiveIssues, diplomaticPosition, tone, isConfidentialMode,
  } = formData;

  const confidentialNote = isConfidentialMode
    ? 'IMPORTANT: Confidential Mode active. Replace all sensitive names, countries, and specifics with placeholders like [OFFICIAL NAME], [COUNTRY], [CLASSIFIED TOPIC], [SENSITIVE DETAIL].'
    : '';

  const topics = Array.isArray(topicsToDiscuss)
    ? topicsToDiscuss.join('\n- ')
    : topicsToDiscuss || '[TOPICS]';

  const userContent = `
${confidentialNote}

Meeting With: ${meetingWith || '[OFFICIAL/DELEGATION]'}
Country / Institution: ${countryInstitution || '[COUNTRY/INSTITUTION]'}
Meeting Date: ${meetingDate || '[DATE]'}
Meeting Location: ${meetingLocation || '[LOCATION]'}
Purpose of Meeting: ${purposeOfMeeting || '[PURPOSE]'}
Topics to Discuss:
- ${topics}
Background Context: ${backgroundContext || 'None provided'}
Sensitive Issues: ${sensitiveIssues || 'None indicated'}
Our Diplomatic Position: ${diplomaticPosition || '[POSITION]'}
Tone: ${tone || 'Neutral'}
`.trim();

  return [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: userContent },
  ];
}

module.exports = { buildMessages };
