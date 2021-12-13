import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '../command';

export const role: Command = {
    options: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Select a role from a role group')
        .addStringOption((option) =>
            option
                .setName('group')
                .setDescription('The command group to select from')
                .setRequired(true),
        ),

    async execute(interaction) {
        const group = interaction.options.getString('group', true);
        await interaction.reply(group);
    },
};
