import { userMention } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Command } from '../command';

export class Fuck extends Command {
    constructor() {
        super();

        this.options
            .setName('fuck')
            .setDescription('fuck')
            .addUserOption((option) =>
                option
                    .setName('target')
                    .setRequired(true)
                    .setDescription('who to fuck'),
            );
    }

    async execute(interaction: CommandInteraction) {
        const target = interaction.options.getUser('target', true);

        const action = Math.random() > 0.5 ? 'topped' : 'bottomed';

        await interaction.reply(
            `${userMention(interaction.user.id)} ${action} ${userMention(
                target.id,
            )}`,
        );
    }
}
