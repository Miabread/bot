import { SlashCommandBuilder } from '@discordjs/builders';
import { Collection, CommandInteraction } from 'discord.js';

export abstract class Command {
    options = new SlashCommandBuilder();

    abstract execute(interaction: CommandInteraction): Promise<unknown>;
}

import { Ping } from './commands/ping';
import { Role } from './commands/role';

const commandArray = [new Ping(), new Role()];

export const commands = new Collection(
    commandArray.map((command) => [command.options.name, command]),
);
