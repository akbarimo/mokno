import dotenv from 'dotenv';
import { Client, Collection, IntentsBitField, Partials } from 'discord.js';
import { db } from './database';
import { INTENTS } from './data/constants';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const bot = new Client({
  allowedMentions: {
    parse: ['users'],
  },
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.User,
  ],
  intents: INTENTS,
});
