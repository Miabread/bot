import 'dotenv/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commands } from './commands';

const config = {
    token: process.env.DISCORD_TOKEN ?? '',
    clientId: '919743888267280444',
    devGuildId: '659466154414440451',
};

const body = Array.from(commands.map((command) => command.options.toJSON()));

new REST({ version: '9' })
    .setToken(config.token)
    .put(Routes.applicationGuildCommands(config.clientId, config.devGuildId), {
        body,
    })
    .then(() => console.log('Deployed commands successfully!'))
    .catch(console.error);
