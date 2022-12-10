const Note = require('../../schemas/note');
const mongoose = require('mongoose');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('list-notes')
    .setDescription('List all the user notes.'),
  async execute(interaction, client) {
    const userID = interaction.user.id;
    let notes = null;
    try {
      notes = await Note.find({ userID: userID });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: 'Something went wrong when accessing the database',
      });
      return;
    }

    if (notes.length == 0) {
      await interaction.reply({
        content: 'Add a note first.',
      });
      return;
    }
    console.log(notes);
    const returnData = notes.map((note) => {
      return { name: note.userNoteTitle, value: note._id.toString() };
    });
    const embed = new EmbedBuilder()
      .setTitle('Notes: ')
      .setColor(client.COLOR)
      .setDescription('List of note titles with their id.')
      .setTimestamp(Date.now())
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .addFields(returnData);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
