import { SlashCommandBuilder } from '@discordjs/builders';
import { Collection, CommandInteraction } from 'discord.js';

export interface Command {
    options: SlashCommandBuilder;
    execute(interaction: CommandInteraction): Promise<unknown>;
}

import { ping } from './commands/ping';

const commandArray = [ping];

export const commands = new Collection(
    commandArray.map((command) => [command.options.name, command]),
);
