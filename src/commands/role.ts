import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember, MessageActionRow, MessageSelectMenu } from 'discord.js';
import { MessageComponentTypes } from 'discord.js/typings/enums';
import { roleGroups } from '..';
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
        const groupName = interaction.options.getString('group', true);
        const group = roleGroups.get(groupName);

        if (!group) {
            return await interaction.reply({
                ephemeral: true,
                content: `Role group "${groupName}" doesn't exist`,
            });
        }

        await interaction.reply({
            content: 'Select a role:',
            ephemeral: true,
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId('role-select')
                        .addOptions(
                            group.map((role) => ({
                                label: role.name,
                                value: role.id,
                            })),
                        ),
                ),
            ],
        });

        const selectInteraction =
            await interaction.channel?.awaitMessageComponent({
                componentType: MessageComponentTypes.SELECT_MENU,
                time: 60000,
                filter(it) {
                    return it.user.id == interaction.user.id;
                },
            });

        const selected = selectInteraction?.values?.[0];

        if (
            !selectInteraction ||
            !selectInteraction.inCachedGuild() ||
            !selected
        ) {
            await interaction.editReply({
                content: `Selection timed out`,
                components: [],
            });
            return;
        }

        const roles = selectInteraction.member.roles;

        await roles.add(selected);

        await Promise.all(
            group
                .filter(
                    (role) => roles.cache.has(role.id) && role.id != selected,
                )
                .map((role) => roles.remove(role)),
        );

        await interaction.editReply({
            content: 'Your roles were updated',
            components: [],
        });
    },
};
