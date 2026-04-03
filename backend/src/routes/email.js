const express = require('express');
const nodemailer = require('nodemailer');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// POST /api/email
router.post('/', optionalAuth, async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'to, subject, and body are required' });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    return res.status(503).json({ error: 'Email service not configured' });
  }

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'Diplomatic Platform'}" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: body,
      html: `<pre style="font-family: Georgia, serif; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${body}</pre>`,
    });

    res.json({ success: true, message: `Email sent to ${to}` });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// POST /api/email/translate — Translate generated content
router.post('/translate', optionalAuth, async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ error: 'text and targetLanguage are required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: 'OpenAI API key not configured' });
  }

  const OpenAI = require('openai').default;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a professional diplomatic translator. Translate the following text into ${targetLanguage}. Preserve the formal diplomatic register, document structure, and all formatting. Output only the translated text — no explanations.`,
        },
        { role: 'user', content: text },
      ],
      temperature: 0.3,
      max_tokens: 3000,
    });

    const translatedText = completion.choices[0]?.message?.content || '';
    res.json({ translatedText });
  } catch (err) {
    console.error('Translation error:', err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

module.exports = router;
