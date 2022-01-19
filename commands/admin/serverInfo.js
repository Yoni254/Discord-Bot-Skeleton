const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Sends some info about this server'),
    async execute(interaction) {
        await interaction.reply('Server Information!');
    },
};