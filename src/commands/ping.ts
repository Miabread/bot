import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../command';

export const ping: Command = {
    options: new SlashCommandBuilder().setName('ping').setDescription('pong'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};
