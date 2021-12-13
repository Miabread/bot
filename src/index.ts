import 'dotenv/config';
import { Client, Intents } from 'discord.js';
import { commands } from './command';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', (_client) => {
    console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
    console.log(`Interaction`);
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    console.log(`Start ${command.options.name}`);

    try {
        await command.execute(interaction);
        console.log(`End ${command.options.name}`);
    } catch (error) {
        console.log(`Error ${command.options.name}`);
        console.error(error);

        await interaction.followUp({
            content: 'Error while executing command',
            ephemeral: true,
        });
    }
});

client.login();
