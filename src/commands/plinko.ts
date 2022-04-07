import { codeBlock } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Command } from '../command';

export class Plinko extends Command {
    constructor() {
        super();

        this.options
            .setName('plinko')
            .setDescription('Horse plinko')
            .addNumberOption((option) =>
                option
                    .setName('width')
                    .setRequired(true)
                    .setDescription('How wide to plinko'),
            )
            .addNumberOption((option) =>
                option
                    .setName('height')
                    .setRequired(true)
                    .setDescription('How many to plinko'),
            )
            .addStringOption((option) =>
                option.setName('disk').setDescription('What to plinko'),
            )
            .addStringOption((option) =>
                option
                    .setName('plinko')
                    .setDescription('What to do the plinking'),
            );
    }

    horse = '🐎';
    plinko = 'o';

    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        const width = interaction.options.getNumber('width', true);
        const height = interaction.options.getNumber('height', true);

        const disk = interaction.options.getString('disk') ?? this.horse;
        const plinko = interaction.options.getString('plinko') ?? this.plinko;

        const space = ' '.repeat(disk.length);

        let position = Math.floor(width / 2);
        let output = '';

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (x === position) {
                    output += disk;
                } else {
                    output += space;
                }
                output += plinko;
            }

            if (position == width) {
                output += disk;
            }

            output += '\n';

            if (this.getRandomBool()) {
                position += 1;
            } else {
                position -= 1;
            }

            if (position > width) {
                position -= 3;
            } else if (position < 0) {
                position += 3;
            }
        }

        if (codeBlock(output).length > 2000) {
            await interaction.editReply('Message too long');
            return;
        }

        await interaction.editReply(codeBlock(output));
    }

    getRandomBool() {
        return Math.random() < 0.5;
    }
}
