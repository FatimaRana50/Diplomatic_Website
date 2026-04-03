const express = require('express');
const { Document: DocxDocument, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const PDFDocument = require('pdfkit');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

function textToParagraphs(content) {
  return content.split('\n').map((line) => {
    const trimmed = line.trim();
    const isEmpty = trimmed === '';

    // Detect headings (ALL CAPS lines or lines ending with colon that are short)
    const isHeading = !isEmpty && trimmed === trimmed.toUpperCase() && trimmed.length < 80 && /[A-Z]/.test(trimmed);

    if (isEmpty) {
      return new Paragraph({ children: [new TextRun('')] });
    }

    if (isHeading) {
      return new Paragraph({
        children: [new TextRun({ text: trimmed, bold: true, font: 'Georgia', size: 24 })],
        spacing: { before: 240, after: 120 },
      });
    }

    return new Paragraph({
      children: [new TextRun({ text: line, font: 'Georgia', size: 22 })],
      spacing: { after: 80 },
    });
  });
}

// POST /api/download/docx
router.post('/docx', optionalAuth, async (req, res) => {
  const { content, filename } = req.body;
  if (!content) return res.status(400).json({ error: 'content is required' });

  try {
    const doc = new DocxDocument({
      sections: [{
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // 1 inch margins
          },
        },
        children: textToParagraphs(content),
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    const safeName = (filename || 'diplomatic-document').replace(/[^a-z0-9-_]/gi, '-');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}.docx"`);
    res.send(buffer);
  } catch (err) {
    console.error('DOCX generation error:', err);
    res.status(500).json({ error: 'Failed to generate DOCX' });
  }
});

// POST /api/download/pdf
router.post('/pdf', optionalAuth, async (req, res) => {
  const { content, filename } = req.body;
  if (!content) return res.status(400).json({ error: 'content is required' });

  try {
    const doc = new PDFDocument({ margin: 72, size: 'A4' });
    const safeName = (filename || 'diplomatic-document').replace(/[^a-z0-9-_]/gi, '-');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}.pdf"`);
    doc.pipe(res);

    doc.font('Times-Roman').fontSize(12);

    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      const isHeading = trimmed && trimmed === trimmed.toUpperCase() && trimmed.length < 80 && /[A-Z]/.test(trimmed);

      if (trimmed === '') {
        doc.moveDown(0.5);
      } else if (isHeading) {
        doc.moveDown(0.3).font('Times-Bold').fontSize(12).text(trimmed).font('Times-Roman').moveDown(0.2);
      } else {
        doc.fontSize(12).text(line, { lineGap: 4 });
      }
    }

    doc.end();
  } catch (err) {
    console.error('PDF generation error:', err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;
