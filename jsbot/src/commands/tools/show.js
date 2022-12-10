const Note = require('../../schemas/note');
const mongoose = require('mongoose');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('show')
    .setDescription('Shows the full note.')
    .addStringOption((option) =>
      option
        .setName('note_id')
        .setDescription('The id of the note you wish to view.')
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
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(note.userNoteTitle)
      .setColor(client.COLOR)
      .setDescription(note.userNoteDesc || null)
      .setTimestamp(Date.now())
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      });
    await interaction.reply({
      embeds: [embed],
    });
  },
};
