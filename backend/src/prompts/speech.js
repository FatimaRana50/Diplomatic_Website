const SYSTEM = `You are an expert speechwriter for ambassadors, ministers, and heads of state. You craft powerful, protocol-correct diplomatic speeches.

STRUCTURE:
1. Salutations — Address attendees in strict protocol order (most senior VIPs first, then audience groups). Each salutation on its own line: "Excellencies, Distinguished Guests, Ladies and Gentlemen,"
2. Opening — Set context and occasion with a dignified, engaging opening
3. Main Body — Deliver the key messages with substance, weaving in any quotes, statistics, or cultural references naturally
4. Call to Action (if provided) — Frame it as an invitation, not a demand
5. Closing — Graceful, memorable conclusion appropriate to the tone and occasion

WORD COUNT BY LENGTH:
- 2 minutes: ~300 words
- 5 minutes: ~750 words
- 10 minutes: ~1,500 words
- Custom: use the word count provided

TONE GUIDANCE:
- Formal: Elevated, ceremonial, protocol-heavy
- Inspirational: Uplifting, motivating, forward-looking
- Diplomatic: Balanced, measured, relationship-focused
- Friendly: Warm, personal touches, accessible
- Visionary: Bold, future-oriented, ambitious

Output only the finished speech text. No stage directions or brackets (except in Confidential Mode).`;

function buildMessages(formData) {
  const {
    speakerName, speakerTitle, countryOrganization, eventName, eventType,
    mainAudience, mainTopic, keyMessages, mentionVIPs, namesOfVIPs,
    tone, speechLength, customWordCount, quotesToInclude,
    statisticsFacts, culturalReferences, callToAction, isConfidentialMode,
  } = formData;

  const confidentialNote = isConfidentialMode
    ? 'IMPORTANT: Confidential Mode active. Replace all sensitive names, countries, and specifics with placeholders like [SPEAKER NAME], [COUNTRY], [VIP NAME], [CLASSIFIED TOPIC].'
    : '';

  const audienceList = Array.isArray(mainAudience) ? mainAudience.join(', ') : mainAudience;
  const keyMessagesList = Array.isArray(keyMessages) ? keyMessages.join('\n- ') : keyMessages;

  const lengthInstruction = speechLength === 'Custom'
    ? `Custom length: approximately ${customWordCount || 500} words`
    : `Length: ${speechLength || '5 min'} (approximately ${speechLength === '2 min' ? 300 : speechLength === '5 min' ? 750 : 1500} words)`;

  const userContent = `
${confidentialNote}

Speaker: ${speakerName || '[SPEAKER NAME]'}, ${speakerTitle || '[TITLE]'}
Organization/Country: ${countryOrganization || '[COUNTRY/ORGANIZATION]'}
Event: ${eventName || '[EVENT NAME]'} — ${eventType || '[EVENT TYPE]'}
Main Audience: ${audienceList || '[AUDIENCE]'}
Main Topic / Theme: ${mainTopic || '[TOPIC]'}
Key Messages:
- ${keyMessagesList || '[KEY MESSAGES]'}
${mentionVIPs && namesOfVIPs ? `VIPs to mention: ${namesOfVIPs}` : ''}
Tone: ${tone || 'Diplomatic'}
${lengthInstruction}
${quotesToInclude ? `Quotes to include: ${quotesToInclude}` : ''}
${statisticsFacts ? `Statistics / Facts to reference: ${statisticsFacts}` : ''}
${culturalReferences ? `Cultural references to weave in: ${culturalReferences}` : ''}
${callToAction ? `Call to Action: ${callToAction}` : ''}
`.trim();

  return [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: userContent },
  ];
}

module.exports = { buildMessages };
