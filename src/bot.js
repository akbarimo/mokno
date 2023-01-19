require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
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
  console.log(interaction.commandName);
  interaction.commandName = 'google';
  try {
    const response = await tasks[interaction.commandName](interaction);
    await functions[interaction.commandName](interaction);
    interaction.editReply({
      embeds: [commands[interaction.commandName](interaction, response)],
    });
  } catch (err) {
    console.error(err);
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
