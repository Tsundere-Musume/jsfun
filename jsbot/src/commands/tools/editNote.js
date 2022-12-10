const Note = require('../../schemas/note');
const mongoose = require('mongoose');
const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('edit-note')
    .setDescription('Edits the specified note.')
    .addStringOption((option) =>
      option
        .setName('note_id')
        .setDescription('The id of the note you wish to edit.')
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
    console.log(note);
    if (!note) {
      await interaction.reply({
        content: 'Please input a valid note id.',
      });
      return;
    }
    const modal = new ModalBuilder()
      .setCustomId('edit-note')
      .setTitle('Note: ');

    const title = new TextInputBuilder()
      .setCustomId(noteID)
      .setLabel('Title: ')
      .setStyle(TextInputStyle.Short)
      .setValue(note.userNoteTitle)
      .setRequired(true);
    const description = new TextInputBuilder()
      .setCustomId('noteDesc')
      .setLabel('Description')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false)
      .setValue(note.userNoteDesc)
      .setMaxLength(1000);
    const titleRow = new ActionRowBuilder().addComponents(title);
    const descRow = new ActionRowBuilder().addComponents(description);
    modal.addComponents(titleRow, descRow);
    await interaction.showModal(modal);
  },
};
