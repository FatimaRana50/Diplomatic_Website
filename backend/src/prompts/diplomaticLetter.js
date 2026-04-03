const SYSTEM = `You are an expert diplomatic correspondent drafting formal letters between embassies, ministries, and government officials.

FORMAT:
[City], [Date]
[Reference number if applicable]

[Recipient Name]
[Recipient Title]
[Recipient Institution/Ministry]
[Recipient Country]

Subject: [Subject]

[Formal salutation — use "Your Excellency," for Ambassadors and Ministers; "Dear [Title] [Name]," for others]

[Opening paragraph — establish identity of sender and purpose]

[Main body — deliver message, request, or content clearly in formal diplomatic language]

[Closing paragraph — courtesy statement and next steps]

[Selected closing formula]

[Sender Name]
[Sender Title]
[Sender Embassy/Ministry]
[Sender Country]

LETTER TYPE GUIDANCE:
- Request: Polite, clear ask with rationale
- Thank You: Warm appreciation, specific acknowledgment
- Invitation: Cordial, event details prominent
- Congratulatory: Genuine warmth, specific achievement noted
- Condolence: Solemn, empathetic, respectful
- Follow-up: Reference prior communication, clear next ask
- Diplomatic Protest: Measured firmness, cites specific concern, avoids aggression

TONE:
- Highly Formal: Maximum ceremonial language, full titles throughout
- Diplomatic: Standard diplomatic register, respectful and clear
- Friendly Diplomatic: Warmer, personal touches, still professional

CLOSING OPTIONS (use exactly as written):
- "Please accept, Your Excellency, the assurances of my highest consideration."
- "Yours sincerely,"
- "With highest regards,"

Output only the finished letter. No meta-commentary.`;

function buildMessages(formData) {
  const {
    senderName, senderTitle, embassyMinistry, senderCountry,
    recipientName, recipientTitle, institutionMinistry, recipientCountry,
    letterType, subject, mainMessage, backgroundInformation,
    deadlineActionRequired, attachments, tone, closing, isConfidentialMode,
  } = formData;

  const confidentialNote = isConfidentialMode
    ? 'IMPORTANT: Confidential Mode active. Replace all sensitive names, subjects, and details with placeholders like [SENDER NAME], [RECIPIENT NAME], [SUBJECT MATTER], [CLASSIFIED DETAILS].'
    : '';

  const userContent = `
${confidentialNote}

SENDER:
Name: ${senderName || '[SENDER NAME]'}
Title: ${senderTitle || '[TITLE]'}
Embassy/Ministry: ${embassyMinistry || '[EMBASSY/MINISTRY]'}
Country: ${senderCountry || '[COUNTRY]'}

RECIPIENT:
Name: ${recipientName || '[RECIPIENT NAME]'}
Title: ${recipientTitle || '[TITLE]'}
Institution/Ministry: ${institutionMinistry || '[INSTITUTION]'}
Country: ${recipientCountry || '[COUNTRY]'}

Letter Type: ${letterType || 'Request'}
Subject: ${subject || '[SUBJECT]'}
Main Message / Request: ${mainMessage || '[MAIN MESSAGE]'}
${backgroundInformation ? `Background Information: ${backgroundInformation}` : ''}
${deadlineActionRequired ? `Deadline / Action Required: ${deadlineActionRequired}` : ''}
${attachments ? `Attachments referenced: ${attachments}` : ''}
Tone: ${tone || 'Diplomatic'}
Closing formula: ${closing || 'Please accept, Your Excellency, the assurances of my highest consideration.'}
`.trim();

  return [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: userContent },
  ];
}

module.exports = { buildMessages };
