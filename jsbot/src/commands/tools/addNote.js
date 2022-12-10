const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-note')
    .setDescription('Adds a note to the database.'),
  async execute(interaction, client) {
    const modal = new ModalBuilder().setCustomId('add-note').setTitle('Note: ');

    const title = new TextInputBuilder()
      .setCustomId('noteTitle')
      .setLabel('Title: ')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    const description = new TextInputBuilder()
      .setCustomId('noteDesc')
      .setLabel('Description')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false)
      .setMaxLength(1000);
    const titleRow = new ActionRowBuilder().addComponents(title);
    const descRow = new ActionRowBuilder().addComponents(description);
    modal.addComponents(titleRow, descRow);
    await interaction.showModal(modal);
  },
};
