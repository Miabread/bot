import { userMention } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Command } from '../command';

export class Ship extends Command {
    constructor() {
        super();

        this.options
            .setName('ship')
            .setDescription('ship')
            .addUserOption((option) =>
                option
                    .setName('top')
                    .setRequired(true)
                    .setDescription('who to ship'),
            )
            .addUserOption((option) =>
                option
                    .setName('bottom')
                    .setRequired(true)
                    .setDescription('who to ship'),
            );
    }

    emojis = [
        ':heart_on_fire:',
        ':broken_heart:',
        ':heart:',
        ':two_hearts:',
        ':revolving_hearts:',
    ];

    async execute(interaction: CommandInteraction) {
        const top = userMention(interaction.options.getUser('top', true).id);
        const bottom = userMention(
            interaction.options.getUser('bottom', true).id,
        );

        const num = Math.random();

        const rating = Math.floor(num * 100);
        const emoji = this.emojis[Math.floor(num * 5)];

        await interaction.reply(
            `${emoji} ${top} and ${bottom} have a ship rating of ${rating}`,
        );
    }
}
