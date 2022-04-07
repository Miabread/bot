import { SlashCommandBuilder } from '@discordjs/builders';
import {
    AutocompleteInteraction,
    Collection,
    CommandInteraction,
} from 'discord.js';

export abstract class Command {
    options = new SlashCommandBuilder();

    abstract execute(interaction: CommandInteraction): Promise<unknown>;

    async autocomplete(
        _interaction: AutocompleteInteraction,
    ): Promise<unknown> {
        return;
    }
}

import { Ping } from './commands/ping';
import { Spin } from './commands/spin';
import { Fuck } from './commands/fuck';
import { Ship } from './commands/ship';
import { Plinko } from './commands/plinko';

const commandArray = [
    new Ping(),
    new Spin(),
    new Fuck(),
    new Ship(),
    new Plinko(),
];

export const commands = new Collection(
    commandArray.map((command) => [command.options.name, command]),
);
