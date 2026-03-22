import type { GeneratorConfig } from '@/types/generator.types';

export const invitationConfig: GeneratorConfig = {
  id: 'invitation',
  title: 'Invitation Letter',
  description: 'Formal diplomatic invitations with event details, dress code, RSVP, and logistic instructions',
  icon: 'PartyPopper',
  sections: [
    {
      id: 'host',
      title: 'Host Details',
      fields: [
        { id: 'hostName',           type: 'text',   label: 'Host Name',            required: true },
        { id: 'hostTitle',          type: 'text',   label: 'Host Title',           required: true, placeholder: 'Ambassador / Minister...' },
        { id: 'embassyOrganization',type: 'text',   label: 'Embassy / Organization',required: true },
        { id: 'hostCountry',        type: 'text',   label: 'Host Country',         required: true },
      ],
    },
    {
      id: 'event',
      title: 'Event Details',
      fields: [
        { id: 'eventName', type: 'text', label: 'Event Name', required: true },
        {
          id: 'eventType', type: 'select', label: 'Event Type', required: true,
          options: ['National Day', 'Diplomatic Reception', 'Conference', 'Cultural Event', 'Official Visit'],
        },
        { id: 'date',  type: 'date', label: 'Date',  required: true },
        { id: 'time',  type: 'time', label: 'Time',  required: true },
        { id: 'venue', type: 'text', label: 'Venue', required: true },
        { id: 'city',  type: 'text', label: 'City',  required: true },
      ],
    },
    {
      id: 'guest',
      title: 'Guest Details',
      fields: [
        { id: 'guestName',        type: 'text', label: 'Guest Name',        required: true },
        { id: 'guestTitle',       type: 'text', label: 'Guest Title',       required: true },
        { id: 'guestInstitution', type: 'text', label: 'Guest Institution', required: true },
      ],
    },
    {
      id: 'details',
      title: 'Additional Details',
      fields: [
        { id: 'dresscode',           type: 'text',     label: 'Dress Code',           placeholder: 'Black Tie / Business Formal...' },
        { id: 'rsvpContact',         type: 'text',     label: 'RSVP Contact',         required: true, placeholder: 'Email or phone number' },
        { id: 'specialInstructions', type: 'textarea', label: 'Special Instructions', rows: 3 },
        {
          id: 'tone', type: 'select', label: 'Tone', required: true,
          options: ['Formal', 'Diplomatic', 'Friendly'],
        },
      ],
    },
  ],
  confidentialFields: ['hostName', 'guestName', 'eventName', 'specialInstructions'],
};
