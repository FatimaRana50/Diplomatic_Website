import type { GeneratorConfig } from '@/types/generator.types';

export const diplomaticLetterConfig: GeneratorConfig = {
  id: 'diplomatic-letter',
  title: 'Diplomatic Letter',
  description: 'Formal diplomatic correspondence with proper salutations, closings, and protocol formatting',
  icon: 'Mail',
  sections: [
    {
      id: 'sender',
      title: 'Sender Details',
      fields: [
        { id: 'senderName',      type: 'text', label: 'Sender Name',       required: true },
        { id: 'senderTitle',     type: 'text', label: 'Sender Title',      required: true, placeholder: 'Ambassador / Minister...' },
        { id: 'embassyMinistry', type: 'text', label: 'Embassy / Ministry',required: true },
        { id: 'senderCountry',   type: 'text', label: 'Sender Country',    required: true },
      ],
    },
    {
      id: 'recipient',
      title: 'Recipient Details',
      fields: [
        { id: 'recipientName',        type: 'text', label: 'Recipient Name',          required: true },
        { id: 'recipientTitle',       type: 'text', label: 'Recipient Title',         required: true },
        { id: 'recipientInstitution', type: 'text', label: 'Institution / Ministry',  required: true },
        { id: 'recipientCountry',     type: 'text', label: 'Recipient Country',       required: true },
      ],
    },
    {
      id: 'letter-details',
      title: 'Letter Details',
      fields: [
        {
          id: 'letterType', type: 'select', label: 'Letter Type', required: true,
          options: ['Request', 'Thank You', 'Invitation', 'Congratulatory', 'Condolence', 'Follow-up', 'Diplomatic Protest'],
        },
        { id: 'subject', type: 'text', label: 'Subject', required: true },
        { id: 'date',    type: 'date', label: 'Date',    required: true },
      ],
    },
    {
      id: 'body',
      title: 'Letter Body',
      fields: [
        { id: 'mainMessage',       type: 'textarea', label: 'Main Message / Request', required: true, rows: 5 },
        { id: 'backgroundInfo',    type: 'textarea', label: 'Background Information', rows: 3 },
        { id: 'deadlineAction',    type: 'text',     label: 'Deadline / Action Required' },
        { id: 'attachments',       type: 'text',     label: 'Attachments',            placeholder: 'List attachment names...' },
        {
          id: 'tone', type: 'select', label: 'Tone', required: true,
          options: ['Highly Formal', 'Diplomatic', 'Friendly Diplomatic'],
        },
        {
          id: 'closing', type: 'select', label: 'Closing', required: true,
          options: ['Assurances of highest consideration', 'Yours sincerely', 'With highest regards'],
        },
      ],
    },
  ],
  confidentialFields: ['senderName', 'recipientName', 'subject', 'mainMessage', 'backgroundInfo'],
};
