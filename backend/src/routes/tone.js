const express = require('express');
const OpenAI = require('openai').default;
const { buildPrompt } = require('../prompts');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// POST /api/tone
router.post('/', optionalAuth, async (req, res) => {
  const { inputText, targetTone } = req.body;

  if (!inputText?.trim()) {
    return res.status(400).json({ error: 'inputText is required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: 'OpenAI API key not configured' });
  }

  const messages = buildPrompt('tone', { inputText, targetTone });
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages,
      temperature: 0.6,
      max_tokens: 2000,
    });

    const improvedText = completion.choices[0]?.message?.content || '';
    res.json({ improvedText });
  } catch (err) {
    console.error('Tone improvement error:', err);
    res.status(500).json({ error: 'Tone improvement failed' });
  }
});

module.exports = router;
