const SYSTEM = `You are a senior diplomatic strategist drafting talking points for a high-level meeting. These are live reference notes — they must be scannable, strategic, and ready to use in a real conversation.

FORMAT:
TALKING POINTS
[Meeting Title] | [Date] | [Location]
Meeting Type: [type] | Classification: [CONFIDENTIAL if applicable]

YOUR REPRESENTATIVE: [name]
OTHER PARTY: [name]

─────────────────────────────────
STRATEGIC OBJECTIVE
─────────────────────────────────
[One clear sentence stating what you want to achieve]

─────────────────────────────────
KEY TALKING POINTS
─────────────────────────────────
TOPIC 1: [Topic Name]
→ Opening position
→ Key argument(s)
→ Supporting evidence / facts / previous agreements
→ Fallback position if pushback occurs

[Repeat for each topic]

─────────────────────────────────
SENSITIVE ISSUES
─────────────────────────────────
→ [Issue]: [How to handle — deflect / acknowledge / reframe]

─────────────────────────────────
DESIRED OUTCOMES
─────────────────────────────────
→ [Outcome 1]
→ [Outcome 2]

TONE GUIDANCE:
- Cooperative: Collaborative, partnership-language, common ground emphasis
- Strategic: Calculated, measured, goal-oriented, minimal concessions upfront
- Firm: Clear red lines, assertive but professional
- Friendly: Warm, personal rapport priority, long-term relationship focus

Output only the talking points document. No meta-commentary.`;

function buildMessages(formData) {
  const {
    meetingTitle, date, location, meetingType, yourRepresentative,
    otherPartyRepresentative, mainObjective, keyTopics, desiredOutcome,
    sensitiveIssues, supportingInformation, tone, isConfidentialMode,
  } = formData;

  const confidentialNote = isConfidentialMode
    ? 'IMPORTANT: Confidential Mode active. Replace all names, countries, and sensitive specifics with placeholders like [REPRESENTATIVE NAME], [OTHER PARTY], [CLASSIFIED OBJECTIVE], [SENSITIVE TOPIC].'
    : '';

  const topics = Array.isArray(keyTopics) ? keyTopics : [keyTopics];
  const topicsText = topics.map((t, i) => `Topic ${i + 1}: ${t}`).join('\n');

  const userContent = `
${confidentialNote}

Meeting Title: ${meetingTitle || '[MEETING TITLE]'}
Date: ${date || '[DATE]'}
Location: ${location || '[LOCATION]'}
Meeting Type: ${meetingType || 'Bilateral'}
Your Representative: ${yourRepresentative || '[YOUR REPRESENTATIVE]'}
Other Party Representative: ${otherPartyRepresentative || '[OTHER PARTY REPRESENTATIVE]'}
Main Objective: ${mainObjective || '[MAIN OBJECTIVE]'}
Key Topics:
${topicsText || '[TOPICS]'}
Desired Outcome: ${desiredOutcome || '[DESIRED OUTCOME]'}
Sensitive Issues: ${sensitiveIssues || 'None indicated'}
Supporting Information: ${supportingInformation || 'None provided'}
Tone: ${tone || 'Strategic'}
`.trim();

  return [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: userContent },
  ];
}

module.exports = { buildMessages };
