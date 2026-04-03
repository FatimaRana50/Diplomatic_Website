const noteVerbale = require('./noteVerbale');
const meetingBrief = require('./meetingBrief');
const meetingSummary = require('./meetingSummary');
const speech = require('./speech');
const diplomaticLetter = require('./diplomaticLetter');
const talkingPoints = require('./talkingPoints');
const invitation = require('./invitation');
const tone = require('./tone');

const PROMPT_BUILDERS = {
  'note-verbale': noteVerbale,
  'meeting-brief': meetingBrief,
  'meeting-summary': meetingSummary,
  speech: speech,
  'diplomatic-letter': diplomaticLetter,
  'talking-points': talkingPoints,
  invitation: invitation,
  tone: tone,
};

/**
 * Builds the OpenAI messages array for a given generator type and form data.
 * Returns null if the generator type is unknown.
 */
function buildPrompt(generatorType, formData) {
  const builder = PROMPT_BUILDERS[generatorType];
  if (!builder) return null;
  return builder.buildMessages(formData);
}

/**
 * Extracts a human-readable subject from form data based on generator type.
 */
function extractSubject(generatorType, formData) {
  switch (generatorType) {
    case 'note-verbale':
      return formData.subject || `Note Verbale — ${formData.sender || 'Unknown Sender'}`;
    case 'meeting-brief':
      return `Meeting Brief: ${formData.meetingWith || 'Unknown'}`;
    case 'meeting-summary':
      return formData.meetingTitle || 'Meeting Summary';
    case 'speech':
      return `Speech: ${formData.eventName || 'Diplomatic Event'}`;
    case 'diplomatic-letter':
      return formData.subject || `Letter to ${formData.recipientName || 'Unknown Recipient'}`;
    case 'talking-points':
      return `Talking Points: ${formData.meetingTitle || 'Meeting'}`;
    case 'invitation':
      return `Invitation: ${formData.eventName || 'Diplomatic Event'}`;
    default:
      return 'Diplomatic Document';
  }
}

module.exports = { buildPrompt, extractSubject };
