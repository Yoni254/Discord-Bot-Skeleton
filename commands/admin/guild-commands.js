const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guild-commands')
        .setDescription('manage bot guild commands')
        .addSubcommand(subCommand =>
            subCommand.setName('reload-permissions')
                .setDescription('Reload permissions for command types')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Which commands should I reload?')
                        .setRequired(true)
                        .addChoice('Admin', 'Reload admin commands')
                        .addChoice('User', 'Reload user commands')
                        .addChoice('Mod', 'Reload mod commands')))
        .addSubcommand(subCommand =>
            subCommand.setName('set-permissions')
                .setDescription('set permissions for command types')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Which command type should I set the permissions for')
                        .setRequired(true)
                        .addChoice('User', 'Reload user commands')
                        .addChoice('Mod', 'Reload mod commands'))),
    async execute(interaction) {
        console.log(interaction)
    },
};