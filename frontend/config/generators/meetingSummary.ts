import type { GeneratorConfig } from '@/types/generator.types';

export const meetingSummaryConfig: GeneratorConfig = {
  id: 'meeting-summary',
  title: 'Meeting Summary',
  description: 'Post-meeting summary with structured outcomes, discussion points, and action items',
  icon: 'FileCheck',
  sections: [
    {
      id: 'meeting-info',
      title: 'Meeting Information',
      fields: [
        { id: 'meetingTitle',  type: 'text',      label: 'Meeting Title', required: true },
        { id: 'participants',  type: 'multilist', label: 'Participants',   placeholder: 'Add participant...' },
        { id: 'date',          type: 'date',      label: 'Date',          required: true },
        { id: 'location',      type: 'text',      label: 'Location' },
      ],
    },
    {
      id: 'summary-content',
      title: 'Summary',
      fields: [
        { id: 'purposeOfMeeting',    type: 'textarea', label: 'Purpose of Meeting',    required: true, rows: 3 },
        { id: 'keyDiscussionPoints', type: 'textarea', label: 'Key Discussion Points', required: true, rows: 4 },
        { id: 'importantStatements', type: 'textarea', label: 'Important Statements',  rows: 3 },
        { id: 'outcomes',            type: 'textarea', label: 'Outcomes',              required: true, rows: 3 },
        { id: 'additionalNotes',     type: 'textarea', label: 'Additional Notes',      rows: 3 },
      ],
    },
  ],
  confidentialFields: ['meetingTitle', 'participants', 'purposeOfMeeting', 'keyDiscussionPoints', 'importantStatements', 'outcomes'],
};
