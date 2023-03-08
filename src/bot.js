require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  ActivityType,
  EmbedBuilder,
} = require('discord.js');
const { DateTime } = require('luxon');
const axios = require('axios');
const functions = require('./modules/functions');
const commands = require('./commands');
const tasks = require('./modules/tasks');

const client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

const handleInteraction = async (interaction) => {
  if (interaction.commandName === 'google') {
    try {
      const response = await tasks[interaction.commandName](interaction);
      await functions[interaction.commandName](interaction);
      interaction.editReply({
        content: null,
        embeds: [commands[interaction.commandName](interaction, response)],
      });
    } catch (err) {
      console.error(err);
      interaction.editReply('There was an error processing your request');
    }
  } else {
    try {
      const response = await tasks[interaction.commandName](interaction);
      interaction.editReply(response);
    } catch (err) {
      console.error(err);
      interaction.editReply('There was an error processing your request');
    }
  }
};

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  interaction.reply('Thinking...').then(() => {
    if (interaction.commandName === 'ping') {
      const time = Date.now();
      interaction.editReply('Pong').then(() => {
        const elapsedTime = Date.now() - time;
        interaction.editReply(`Pong! ${elapsedTime}ms`);
      });
    } else if (interaction.commandName === 'userinfo') {
      const testEmbed = new EmbedBuilder()
        .setColor(0x009900)
        .setTitle('User Info')
        .setAuthor({
          name: `${interaction.options._hoistedOptions[0].member.user.username}${interaction.options._hoistedOptions[0].member.user.discriminator} ~ ${interaction.options._hoistedOptions[0].member.user.username}`,
          iconURL: `${interaction.options._hoistedOptions[0].member.user.displayAvatarURL(
            interaction.options._hoistedOptions[0].member.user.avatar,
          )}`,
          url: `${interaction.options._hoistedOptions[0].member.user.displayAvatarURL(
            interaction.user.avatar,
          )}`,
        })
        .addFields(
          // {
          //   name: '\u200b',
          //   value: '\u200b',
          // },
          {
            name: 'Joined At',
            value: new DateTime(
              interaction.options._hoistedOptions[0].member.joinedTimestamp,
            ).toFormat('ff'),
            inline: true,
          },
        );
      const testFunc = async () => {
        try {
          const user = await interaction.guild.members.fetch(
            interaction.user.id,
          );
        } catch (err) {
          console.error(err);
        }
      };
      testFunc();
      interaction.editReply({
        content: '',
        embeds: [testEmbed],
      });
    } else {
      handleInteraction(interaction);
    }
  });
});

client
  .login(process.env.BOT_SECRET)
  .then(() => {
    console.log(`Bot logged in as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: '/help', type: ActivityType.Listening }],
      status: 'online',
    });
  })
  .catch((err) => {
    console.error(err);
  });
