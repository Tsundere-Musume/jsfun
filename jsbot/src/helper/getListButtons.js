const { ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = (count, embedFields) => {
  const firstPage = new ButtonBuilder()
    .setCustomId('0')
    .setEmoji('⏪')
    .setDisabled(count == 0)
    .setStyle(ButtonStyle.Primary);

  const prevButton = new ButtonBuilder()
    .setCustomId('p')
    .setEmoji('◀️')
    .setDisabled(count == 0)
    .setStyle(ButtonStyle.Primary);

  const nextButton = new ButtonBuilder()
    .setCustomId('n')
    .setEmoji('▶️')
    .setDisabled(count + 1 == embedFields.length)
    .setStyle(ButtonStyle.Primary);

  const lastPage = new ButtonBuilder()
    .setCustomId('-1')
    .setEmoji('⏩')
    .setDisabled(count + 1 == embedFields.length)
    .setStyle(ButtonStyle.Primary);

  return new ActionRowBuilder().addComponents(
    firstPage,
    prevButton,
    nextButton,
    lastPage
  );
};
