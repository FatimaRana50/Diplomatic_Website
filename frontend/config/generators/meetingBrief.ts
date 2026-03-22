import type { GeneratorConfig } from '@/types/generator.types';

export const meetingBriefConfig: GeneratorConfig = {
  id: 'meeting-brief',
  title: 'Meeting Brief',
  description: 'Pre-meeting briefing document with context, talking points, and strategic positioning',
  icon: 'ClipboardList',
  sections: [
    {
      id: 'meeting-details',
      title: 'Meeting Details',
      fields: [
        { id: 'meetingWith',         type: 'text', label: 'Meeting With',          required: true, placeholder: 'Person / delegation name' },
        { id: 'countryInstitution',  type: 'text', label: 'Country / Institution', required: true },
        { id: 'meetingDate',         type: 'date', label: 'Meeting Date',          required: true },
        { id: 'meetingLocation',     type: 'text', label: 'Meeting Location' },
      ],
    },
    {
      id: 'briefing-content',
      title: 'Briefing Content',
      fields: [
        { id: 'purposeOfMeeting',  type: 'textarea',  label: 'Purpose of Meeting',    required: true, rows: 3 },
        { id: 'topicsToDiscuss',   type: 'multilist', label: 'Topics to Discuss',      placeholder: 'Add topic...' },
        { id: 'backgroundContext', type: 'textarea',  label: 'Background Context',     rows: 4 },
        { id: 'sensitiveIssues',   type: 'textarea',  label: 'Sensitive Issues',       rows: 3 },
        { id: 'diplomaticPosition',type: 'textarea',  label: 'Diplomatic Position',    required: true, rows: 3 },
        {
          id: 'tone', type: 'select', label: 'Tone', required: true,
          options: ['Friendly', 'Neutral', 'Strategic', 'Firm'],
        },
      ],
    },
  ],
  confidentialFields: ['meetingWith', 'countryInstitution', 'purposeOfMeeting', 'topicsToDiscuss', 'sensitiveIssues', 'diplomaticPosition'],
};
