import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commands } from './command';
import { config } from '../config';

const body = Array.from(commands.map((command) => command.options.toJSON()));

const rest = new REST({ version: '9' }).setToken(config.token);

if (require.main == module) {
    for (const guildId of config.guildIds) {
        rest.put(Routes.applicationGuildCommands(config.clientId, guildId), {
            body,
        })
            .then(() => console.log('Deployed commands successfully!'))
            .catch(console.error);
    }
}
