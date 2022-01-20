const { ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('userinfo')
        .setType(2), // 2 = User

    async execute(interaction) {
        await interaction.reply('User Information!');
    },
};