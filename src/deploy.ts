import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commands } from './command';
import { config } from '../config';

const body = Array.from(commands.map((command) => command.options.toJSON()));

new REST({ version: '9' })
    .setToken(config.token)
    .put(Routes.applicationGuildCommands(config.clientId, config.devGuildId), {
        body,
    })
    .then(() => console.log('Deployed commands successfully!'))
    .catch(console.error);
