const { StringSelectMenuBuilder } = require('discord.js');
module.exports = () => {
  const menu = new StringSelectMenuBuilder()
    .setCustomId('list-menu')
    .setMinValues(1)
    .setMaxValues(1)
    .setPlaceholder('Select Ttile');
  return menu;
};
