const Note = require('../../schemas/note');
const mongoose = require('mongoose');
module.exports = {
  data: {
    name: `edit-note`,
  },
  async execute(interaction, client) {
    const noteID = [...interaction.fields.fields.keys()][0];
    const noteTitle = interaction.fields.getTextInputValue(noteID);
    const noteDesc = interaction.fields.getTextInputValue('noteDesc');
    try {
      await Note.findByIdAndUpdate(noteID, {
        userNoteTitle: noteTitle,
        userNoteDesc: noteDesc,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Something went wrong when updating the database.',
        ephemeral: true,
      });
      return;
    }
    await interaction.reply({
      content: `\`${noteID}\`: Note successfully updated.`,
      ephemeral: true,
    });
  },
};
