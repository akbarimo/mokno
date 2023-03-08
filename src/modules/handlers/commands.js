const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const { BOT_SECRET, BOT_ID } = require('../../../config');

const rest = new REST({ version: '10' }).setToken(BOT_SECRET);

const commands = [
  {
    name: 'ping',
    description: 'Replies with bot ping',
  },
  {
    name: 'userinfo',
    description: 'Grab user info of specific user',
    options: [
      {
        name: 'user',
        type: ApplicationCommandOptionType.Mentionable,
        description: 'Mention a user to grab their info',
        required: true,
      },
    ],
  },
  {
    name: 'google',
    description: 'Ask google a question',
    options: [
      {
        name: 'question',
        type: ApplicationCommandOptionType.String,
        description: 'A question to ask google',
        required: true,
      },
    ],
  },
  {
    name: 'chat',
    description: 'Ask chatGPT anything',
    options: [
      {
        name: 'question',
        type: ApplicationCommandOptionType.String,
        description: 'Ask chatGPT anything',
        required: true,
      },
    ],
  },
];

rest
  .put(Routes.applicationCommands(BOT_ID), { body: commands })
  .then(() => {
    console.log('Sucess reloading commands!');
  })
  .catch((err) => console.error(err));
