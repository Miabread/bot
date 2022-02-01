import { userMention } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Command } from '../command';

export class Spin extends Command {
    constructor() {
        super();

        this.options.setName('spin').setDescription('Spin the bottle');
    }

    async execute(interaction: CommandInteraction) {
        if (!interaction.inCachedGuild()) {
            return interaction.reply("The server doesn't exist apparently");
        }

        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply("You're not in a voice channel");
        }

        const user = voiceChannel.members.random();

        if (!user) {
            return interaction.reply('No one is in the voice channel');
        }

        await interaction.reply(`The bottle landed on ${userMention(user.id)}`);
    }
}
