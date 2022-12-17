const Note = require('../../schemas/note');
const mongoose = require('mongoose');
const getListEmbed = require('../../helper/getListEmbed.js');
const getListMenu = require('../../helper/getListMenu.js');
const getButtons = require('../../helper/getListButtons.js');
const showNote = require('./show.js');
const {
  ComponentType,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('list-notes')
    .setDescription('List all the user notes.'),
  async execute(interaction, client) {
    const userID = interaction.user.id;
    const listLength = 3;
    let notes = null;
    let count = 0;
    try {
      notes = await Note.find({ userID: userID });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: 'Something went wrong when accessing the database',
        ephemeral: true,
      });
      return;
    }

    if (notes.length == 0) {
      await interaction.reply({
        content: 'Add a note first.',
        ephemeral: true,
      });
      return;
    }
    const embedFields = [];
    const menuOptions = [];
    for (i = 0; i < notes.length; i += listLength) {
      const embedItem = [];
      const menuItem = [];
      for (const note of notes.slice(i, i + listLength)) {
        const title = note.userNoteTitle;
        const noteID = note._id.toString();
        embedItem.push({ name: title, value: noteID });
        menuItem.push({ label: title, value: noteID });
      }
      embedFields.push(embedItem);
      menuOptions.push(menuItem);
    }

    const embed = getListEmbed(interaction, client).addFields(
      embedFields[count]
    );
    const menu = getListMenu().setOptions(menuOptions[count]);
    const buttons = getButtons(count, embedFields);
    const message = await interaction.reply({
      embeds: [embed],
      components: [buttons, new ActionRowBuilder().addComponents(menu)],
      ephemeral:true,
      fetchReply: false,
    });

    const menuCollector = message.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 30000,
    });

    menuCollector.on('collect', (i) => {
      if (i.user.id === interaction.user.id) {
        showNote.execute(i, client, i.values[0]);
      } else {
        i.reply({ content: `These aren't for you.`, ephemeral: true });
      }
    });

    const buttonCollector = message.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 30000,
    });

    buttonCollector.on('collect', async (i) => {
      if (i.customId === '0') count = 0;
      else if (i.customId === 'p') count--;
      else if (i.customId === 'n') count++;
      else count = embedFields.length - 1;
      await i.update({
        embeds: [getListEmbed(i, client).addFields(embedFields[count])],
        components: [
          getButtons(count, embedFields),
          new ActionRowBuilder().addComponents(
            getListMenu().setOptions(menuOptions[count])
          ),
        ],
      });
    });
  },
};
