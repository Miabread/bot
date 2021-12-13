import { CommandInteraction } from 'discord.js';
import { Command } from '../command';

export class Ping extends Command {
    constructor() {
        super();

        this.options.setName('ping').setDescription('pong');
    }

    async execute(interaction: CommandInteraction) {
        await interaction.reply('Pong!');
    }
}
