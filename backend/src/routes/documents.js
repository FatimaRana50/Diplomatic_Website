const express = require('express');
const Document = require('../models/Document');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/documents?page=1&pageSize=10
router.get('/', requireAuth, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize) || 10));
  const skip = (page - 1) * pageSize;

  try {
    const [data, total] = await Promise.all([
      Document.find({ userId: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .select('type subject createdAt'),
      Document.countDocuments({ userId: req.user.id }),
    ]);

    res.json({
      data: data.map((d) => ({
        id: d._id,
        type: d.type,
        subject: d.subject,
        createdAt: d.createdAt,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error('Documents list error:', err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// GET /api/documents/:id
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, userId: req.user.id });
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    res.json({
      id: doc._id,
      type: doc.type,
      subject: doc.subject,
      content: doc.content,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      userId: doc.userId,
    });
  } catch (err) {
    console.error('Document fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
});

// DELETE /api/documents/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const doc = await Document.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('Document delete error:', err);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

module.exports = router;
