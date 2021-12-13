import 'dotenv/config';
import { Client, Intents } from 'discord.js';
import { commands } from './commands';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', (_client) => {
    console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'Error while executing command',
            ephemeral: true,
        });
    }
});

client.login();
