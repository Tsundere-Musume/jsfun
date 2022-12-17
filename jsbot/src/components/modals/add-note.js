const Note = require('../../schemas/note');
const mongoose = require('mongoose');
module.exports = {
  data: {
    name: `add-note`,
  },
  async execute(interaction, client) {
    const noteTitle = interaction.fields.getTextInputValue('noteTitle');
    const noteDesc = interaction.fields.getTextInputValue('noteDesc');
    const note = await new Note({
      _id: mongoose.Types.ObjectId(),
      userID: interaction.user.id,
      userNoteTitle: noteTitle,
      userNoteDesc: noteDesc,
    });
    await note.save().catch(async (err) => {
      console.error(err);
      await interaction.reply({
        content: 'Something went wrong when adding data.',
        ephemeral: true,
      });
    });
    await interaction.reply({
      content: 'Successfully added note.',
      ephemeral: true,
    });
  },
};
