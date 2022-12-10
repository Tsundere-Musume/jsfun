const Note = require('../../schemas/note');
const mongoose = require('mongoose');
const { SlashCommandBuilder, IntegrationApplication } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('drop')
    .setDescription('Deletes all user notes.'),
  async execute(interaction, client) {
    const userID = interaction.user.id;
    success = async () => {
      await interaction.reply({
        content: `All notes of ${interaction.user.tag} successfully deleted.`,
      });
    };

    fail = async (error) => {
      console.error(error);
      await interaction.reply({
        content: `Something went wrong when deleting records of ${interaction.user.tag}`,
      });
    };

    Note.deleteMany({userID:userID}).then(success).catch(fail)
  },
};
