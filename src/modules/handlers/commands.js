require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.BOT_SECRET);

const commands = [
  {
    name: 'ping',
    description: 'Replies with bot ping',
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
];

rest
  .put(Routes.applicationCommands(process.env.BOT_ID), { body: commands })
  .then(() => {
    console.log('Sucess reloading commands!');
  })
  .catch((err) => console.error(err));
