const { ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Message Info')
        .setType(3), // 2 = User

    async execute(interaction) {
        await interaction.reply('User Information!');
    },
};