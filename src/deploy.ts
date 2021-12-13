import 'dotenv/config';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types';

const config = {
    token: process.env.DISCORD_TOKEN ?? '',
    clientId: '919743888267280444',
    devGuildId: '659466154414440451',
};

console.log('wew');

const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
].map((it) => it.toJSON());

new REST({ version: '9' })
    .setToken(config.token)
    .put(Routes.applicationGuildCommands(config.clientId, config.devGuildId), {
        body: commands,
    })
    .then(() => console.log('Deployed commands successfully!'))
    .catch(console.error);
