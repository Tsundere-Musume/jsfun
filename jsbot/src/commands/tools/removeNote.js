const Note = require('../../schemas/note');
const mongoose = require('mongoose');
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove-note')
    .setDescription('Removes the note with the specified id.')
    .addStringOption((option) =>
      option
        .setName('note_id')
        .setDescription('The id of the note you wish to delete.')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const noteID = interaction.options.getString('note_id');
    const userID = interaction.user.id;
    let note = null;
    try {
      note = await Note.findById(noteID, 'userNoteTitle userNoteDesc')
        .where('userID')
        .equals(userID);
    } catch (error) {
      console.error(error);
    }
    if (!note) {
      await interaction.reply({
        content: 'Please input a valid note id.',
        ephemeral: true,
      });
      return;
    }
    note
      .remove()
      .then(
        async () =>
          await interaction.reply({
            content: `\`${noteID}\`: Note successfully deleted.`,
            ephemeral: true,
          })
      )
      .catch(async (err) => {
        console.error(err);
        await interaction.reply({
          content: 'Something went wrong when deleting the record.',
          ephemeral: true,
        });
      });
  },
};
