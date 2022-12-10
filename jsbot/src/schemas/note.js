const { Schema, model } = require('mongoose');
const noteSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userID: String,
  userNoteTitle: String,
  userNoteDesc: String,
});

module.exports = model('Note', noteSchema, 'notes');
