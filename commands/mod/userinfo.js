const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Replies with information about a specific user!'),
    async execute(interaction) {
        await interaction.reply('User Information!');
    },
};