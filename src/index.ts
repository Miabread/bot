import 'dotenv/config';
import { Client, Intents } from 'discord.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', (_client) => {
    console.log('Ready!');
});

client.login();
