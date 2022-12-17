const { EmbedBuilder } = require('discord.js');
module.exports = (interaction, client) => {
  const embed = new EmbedBuilder()
    .setTitle('Notes: ')
    .setColor(client.COLOR)
    .setDescription('List of note titles with their id.')
    .setTimestamp(Date.now())
    .setAuthor({
      iconURL: interaction.user.displayAvatarURL(),
      name: interaction.user.tag,
    })
  return embed
};
