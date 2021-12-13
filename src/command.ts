import { SlashCommandBuilder } from '@discordjs/builders';
import { Collection, CommandInteraction } from 'discord.js';

export interface Command {
    options: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    execute(interaction: CommandInteraction): Promise<unknown>;
}

import { ping } from './commands/ping';
import { role } from './commands/role';

const commandArray = [ping, role];

export const commands = new Collection(
    commandArray.map((command) => [command.options.name, command]),
);
