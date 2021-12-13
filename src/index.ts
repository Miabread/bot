import { Client, Collection, Intents, Role } from 'discord.js';
import { config } from '../config';
import { commands } from './command';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

export const roleGroups = new Collection<string, Role[]>();

client.on('ready', async (_client) => {
    console.log('Client ready');

    const guild = client.guilds.cache.get(config.guildId);
    if (!guild) throw new Error('Guild not found');

    for (const [name, ids] of Object.entries(config.roleGroups)) {
        const roles = ids.map((id) => {
            const role = guild.roles.cache.get(id);
            if (!role) throw new Error('Role not found');
            return role;
        });

        roleGroups.set(name, roles);
    }

    console.log(`Setup ${Object.keys(config.roleGroups).length} role groups`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    console.log(`Command interaction`);

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

// client.on('interactionCreate', async (interaction) => {
//     if (!interaction.isAutocomplete()) return;
//     console.log(`Autocomplete interaction`);

//     interaction.respond()
// });

client.login(config.token);
