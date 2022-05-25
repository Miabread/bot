import { userMention } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { Command } from '../command';

export class Someone extends Command {
    constructor() {
        super();

        this.options
            .setName('someone')
            .setDescription('I need @someone')
            .addRoleOption((option) =>
                option.setName('role').setDescription('Limit to a role'),
            );
    }

    async execute(interaction: CommandInteraction) {
        const role = interaction.options.getRole('role', true);

        if (!interaction.guild) {
            await interaction.reply('Not in a guild');
            return;
        }

        await interaction.guild.members.fetch();

        const victim = interaction.guild.members.cache
            .filter(
                (member) => !member.user.bot && member.roles.cache.has(role.id),
            )
            .random();

        if (!victim) {
            await interaction.reply('But nobody came.');
            return;
        }

        await interaction.reply(
            this.getRandomElement(this.emoticons) +
                ' ' +
                userMention(victim.id),
        );
    }

    getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    emoticons = [
        '¯\\_(ツ)_/¯',
        '( ͡° ͜ʖ ͡°)',
        'ಠ_ಠ',
        '༼ つ ◕_◕ ༽つ',
        '(ง ͠° ͟ل͜ ͡°)ง',
        '(╯°□°）╯︵ ┻━┻',
        '┻━┻ ︵ ヽ(°□°ヽ)',
        '┻━┻ ︵ \\( °□° )/ ︵ ┻━┻',
        '┬─┬ノ( º _ ºノ)',
        '(ﾉಥ益ಥ）ﾉ ┻━┻',
        '┬──┬ ¯_(ツ)',
        '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻',
        '┻━┻ ︵ ¯(ツ)/¯ ︵ ┻━┻',
        '(╯°Д°）╯︵ /(.□ . )',
        'ʕノ•ᴥ•ʔノ ︵ ┻━┻',
        'ಠ_ಠ',
        '┌∩┐(◣_◢)┌∩┐',
        'ლ(ಠ益ಠ)ლ',
        '(ง’̀-‘́)ง',
        '(ಠ_ಠ)',
        '╭∩╮（︶︿︶）╭∩╮',
        '(ᵔᴥᵔ)',
        '(=^ェ^=)',
        'ʕ •ᴥ•ʔ',
        '（・⊝・）',
        '=＾● ⋏ ●＾=',
        '( 。・_・。)人(。・_・。 )',
        '└(^o^ )X( ^o^)┘',
        '(✿◠‿◠)',
        '(｡◕‿◕｡)',
        'ヽ༼ຈل͜ຈ༽ﾉ',
        '(づ｡◕‿‿◕｡)づ',
        '~(˘▾˘~)',
        'ヘ( ^o^)/\\(^_^ )',
        '(. ❛ ᴗ ❛.)',
        '｡^‿^｡',
        '( ͡ᵔ ͜ʖ ͡ᵔ )',
        ' ☉_☉',
        '¯(°_o)/¯',
        '(゜-゜)',
        '(・_・ヾ',
        'o_O',
        '(¬_¬)',
        '( ͡° ʖ̯ ͡°)',
        '╮ (. ❛ ᴗ ❛.) ╭',
        '(•_•) ( •_•)>⌐■-■ (⌐■_■)',
        '(▀̿Ĺ̯▀̿ ̿)',
    ];
}
