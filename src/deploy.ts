import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commands } from './command';
import { config } from '../config';

const body = Array.from(commands.map((command) => command.options.toJSON()));

if (require.main == module) {
    new REST({ version: '9' })
        .setToken(config.token)
        .put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
            body,
        })
        .then(() => console.log('Deployed commands successfully!'))
        .catch(console.error);
}
