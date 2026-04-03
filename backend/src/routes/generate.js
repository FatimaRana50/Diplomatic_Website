const express = require('express');
const OpenAI = require('openai').default;
const { buildPrompt, extractSubject } = require('../prompts');
const Document = require('../models/Document');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// POST /api/generate
router.post('/', optionalAuth, async (req, res) => {
  const { generatorType, formData } = req.body;

  if (!generatorType || !formData) {
    return res.status(400).json({ error: 'Missing generatorType or formData' });
  }

  const messages = buildPrompt(generatorType, formData);
  if (!messages) {
    return res.status(400).json({ error: `Unknown generator type: ${generatorType}` });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: 'OpenAI API key not configured' });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Set streaming headers
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  let fullContent = '';

  try {
    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 3000,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(content);
        fullContent += content;
      }
    }

    res.end();

    // Save to DB after streaming (non-blocking)
    if (fullContent && process.env.MONGODB_URI) {
      const subject = extractSubject(generatorType, formData);
      Document.create({
        userId: req.user?.id || null,
        type: generatorType,
        subject,
        content: fullContent,
        formData,
      }).catch((err) => console.error('Document save error:', err));
    }
  } catch (err) {
    console.error('Generation error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Document generation failed' });
    } else {
      res.end();
    }
  }
});

module.exports = router;
