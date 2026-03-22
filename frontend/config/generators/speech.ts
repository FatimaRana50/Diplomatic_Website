import type { GeneratorConfig } from '@/types/generator.types';

export const speechConfig: GeneratorConfig = {
  id: 'speech',
  title: 'Speech',
  description: 'Full diplomatic speeches with proper salutations, VIP mentions, and cultural references',
  icon: 'Mic',
  sections: [
    {
      id: 'speaker',
      title: 'Speaker Details',
      fields: [
        { id: 'speakerName',         type: 'text', label: 'Speaker Name',          required: true },
        { id: 'speakerTitle',        type: 'text', label: 'Speaker Title',         required: true, placeholder: 'Ambassador / Minister / Director...' },
        { id: 'countryOrganization', type: 'text', label: 'Country / Organization',required: true },
      ],
    },
    {
      id: 'event',
      title: 'Event Details',
      fields: [
        { id: 'eventName', type: 'text', label: 'Event Name', required: true },
        {
          id: 'eventType', type: 'select', label: 'Event Type', required: true,
          options: ['Conference', 'National Day', 'Bilateral Meeting', 'Opening Ceremony', 'Cultural Event', 'Diplomatic Reception'],
        },
        {
          id: 'mainAudience', type: 'multi-select', label: 'Main Audience',
          options: ['Diplomats', 'Government Officials', 'Business Leaders', 'Media', 'Students', 'General Public'],
        },
      ],
    },
    {
      id: 'content',
      title: 'Speech Content',
      fields: [
        { id: 'mainTopic',           type: 'textarea',  label: 'Main Topic / Theme', required: true, rows: 3 },
        { id: 'keyMessages',         type: 'multilist', label: 'Key Messages (3–5 points)', placeholder: 'Add key message...' },
        { id: 'mentionVIPs',         type: 'toggle',    label: 'Mention VIPs?' },
        {
          id: 'vipNamesConditional', type: 'conditional', label: '',
          controlledBy: 'mentionVIPs', showWhen: true,
          childField: { id: 'vipNames', type: 'text', label: 'Names of VIPs' },
        },
        {
          id: 'tone', type: 'select', label: 'Tone', required: true,
          options: ['Formal', 'Inspirational', 'Diplomatic', 'Friendly', 'Visionary'],
        },
        {
          id: 'speechLength', type: 'select', label: 'Speech Length', required: true,
          options: ['2 minutes', '5 minutes', '10 minutes', 'Custom'],
        },
        {
          id: 'speechLengthCustomConditional', type: 'conditional', label: '',
          controlledBy: 'speechLength', showWhenValue: 'Custom',
          childField: { id: 'customWordCount', type: 'number', label: 'Custom Word Count', min: 50, max: 5000, placeholder: 'e.g. 800' },
        },
        { id: 'quotesToInclude',     type: 'textarea', label: 'Quotes to Include',     rows: 2 },
        { id: 'statisticsFacts',     type: 'textarea', label: 'Statistics / Facts',    rows: 2 },
        { id: 'culturalReferences',  type: 'textarea', label: 'Cultural References',   rows: 2 },
        { id: 'callToAction',        type: 'textarea', label: 'Call to Action',        rows: 2 },
      ],
    },
  ],
  confidentialFields: ['speakerName', 'eventName', 'mainTopic', 'keyMessages', 'vipNames'],
};
