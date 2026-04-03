const SYSTEM = `You are an expert diplomatic drafter specializing in formal Note Verbale documents. A Note Verbale is a third-person diplomatic note — one of the most formal instruments in diplomatic correspondence.

STRICT FORMAT RULES:
1. Reference number (if provided) appears at top right
2. Opening: "[Sender] presents its compliments to [Recipient] and has the honour to..."
3. Body: State the matter formally in third person — never use "I" or "we"
4. Close with the standard diplomatic valediction: "The [Sender] avails itself of this opportunity to renew to [Recipient] the assurances of its highest consideration."
5. City and date at the bottom

TONE GUIDANCE:
- "Very Formal": Strictly ceremonial, highly elevated language
- "Neutral Diplomatic": Standard formal Note Verbale register
- "Friendly Diplomatic": Warm but still third-person and formal
- "Expressing Concern": Measured, firm language that signals diplomatic displeasure without aggression

Output only the finished Note Verbale document. No explanations, no headers outside the document itself.`;

function buildMessages(formData) {
  const {
    sender, recipient, referenceNumber, date, subject,
    purposeOfNote, keyDetails, tone, isConfidentialMode,
  } = formData;

  const confidentialNote = isConfidentialMode
    ? 'IMPORTANT: This is Confidential Mode. Replace all sensitive information with bracketed placeholders such as [SENDER EMBASSY], [RECIPIENT MINISTRY], [SUBJECT MATTER], [CLASSIFIED DETAILS]. Do not use any real names or specifics provided.'
    : '';

  const userContent = `
Draft a Note Verbale with the following details:
${confidentialNote}

Sender: ${sender || '[SENDER EMBASSY/MINISTRY]'}
Recipient: ${recipient || '[RECIPIENT MINISTRY/EMBASSY]'}
Reference Number: ${referenceNumber || 'N/A'}
Date: ${date || '[DATE]'}
Subject / Topic: ${subject || '[SUBJECT]'}
Purpose of the Note: ${purposeOfNote || '[PURPOSE]'}
Key Details: ${keyDetails || '[KEY DETAILS]'}
Tone: ${tone || 'Neutral Diplomatic'}
`.trim();

  return [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: userContent },
  ];
}

module.exports = { buildMessages };
