const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('global-commands')
        .setDescription('*Dev only* - manage bot global commands')
        .addSubcommand(subCommand =>
            subCommand.setName('reload')
                .setDescription('Reload specific command types')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Which commands should I reload?')
                        .setRequired(true)
                        .addChoice('Dev', 'Reload dev commands')
                        .addChoice('Admin', 'Reload admin commands')
                        .addChoice('User', 'Reload user commands')
                        .addChoice('Mod', 'Reload mod commands'))),
    async execute(interaction) {
        console.log(interaction)
    },
};