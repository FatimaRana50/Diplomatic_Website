const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  type: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  formData: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

documentSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Document', documentSchema);
