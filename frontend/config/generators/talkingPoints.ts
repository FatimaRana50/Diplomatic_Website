import type { GeneratorConfig } from '@/types/generator.types';

export const talkingPointsConfig: GeneratorConfig = {
  id: 'talking-points',
  title: 'Talking Points',
  description: 'Structured talking points with strategic objectives, sensitive issue handling, and desired outcomes',
  icon: 'ListOrdered',
  sections: [
    {
      id: 'meeting-info',
      title: 'Meeting Information',
      fields: [
        { id: 'meetingTitle',    type: 'text',   label: 'Meeting Title',   required: true },
        { id: 'date',            type: 'date',   label: 'Date' },
        { id: 'location',        type: 'text',   label: 'Location' },
        {
          id: 'meetingType', type: 'select', label: 'Meeting Type', required: true,
          options: ['Bilateral', 'Multilateral', 'Courtesy Call', 'Negotiation'],
        },
        { id: 'yourRepresentative',       type: 'text', label: 'Your Representative',         required: true },
        { id: 'otherPartyRepresentative', type: 'text', label: 'Other Party Representative',  required: true },
      ],
    },
    {
      id: 'content',
      title: 'Content',
      fields: [
        { id: 'mainObjective',      type: 'textarea',  label: 'Main Objective',        required: true, rows: 3 },
        { id: 'keyTopics',          type: 'multilist', label: 'Key Topics (up to 3)',   placeholder: 'Add topic...' },
        { id: 'desiredOutcome',     type: 'textarea',  label: 'Desired Outcome',        required: true, rows: 3 },
        { id: 'sensitiveIssues',    type: 'textarea',  label: 'Sensitive Issues',       rows: 3 },
        { id: 'supportingInfo',     type: 'textarea',  label: 'Supporting Information', rows: 3 },
        {
          id: 'tone', type: 'select', label: 'Tone', required: true,
          options: ['Cooperative', 'Strategic', 'Firm', 'Friendly'],
        },
      ],
    },
  ],
  confidentialFields: ['meetingTitle', 'yourRepresentative', 'otherPartyRepresentative', 'mainObjective', 'keyTopics', 'sensitiveIssues'],
};
