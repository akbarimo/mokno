import dotenv from 'dotenv';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import axios from 'axios';

const client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

client.once('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    const time = Date.now();
    interaction.reply('Pong').then(() => {
      const elapsedTime = Date.now() - time;

      interaction.editReply(`Pong! ${elapsedTime}ms`);
    });
  } else if (interaction.commandName === 'ask') {
    interaction.reply('Asking Google...');
    axios
      .get('https://www.googleapis.com/customsearch/v1', {
        params: {
          q: interaction.options._hoistedOptions[0].value,
          key: process.env.GOOGLE_API,
          cx: process.env.GOOGLE_CX,
        },
      })
      .then((response) => {
        interaction.editReply(response.data.items[0].link);
      });
  }
});

client
  .login(process.env.BOT_SECRET)
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });
