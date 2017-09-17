const mongoose = require('mongoose')

const relationshipSchema = new mongoose.Schema(
  {
    following: {
      ref: 'User',
      required: true,
      type: mongoose.Schema.Types.ObjectId
    },
    user: {
      ref: 'User',
      required: true,
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
)

relationshipSchema.index({ following: 1, user: 1 }, { unique: true })

module.exports = mongoose.model('Relationship', relationshipSchema)
