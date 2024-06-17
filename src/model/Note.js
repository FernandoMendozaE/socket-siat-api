const { Document, Schema, model } = require('mongoose')

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
