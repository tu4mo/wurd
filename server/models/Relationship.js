const mongoose = require('mongoose')

const relationshipSchema = new mongoose.Schema(
  {
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

relationshipSchema.index({ following: 1, user: 1 }, { unique: true })

module.exports = mongoose.model('Relationship', relationshipSchema)
