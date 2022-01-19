const fs = require("fs");
const { devId } = require('../configs/config.json')
const asciimo = require('asciimo').Figlet;
const colors = require('colors')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        asciimo.write("Welcome! Starting Up!", 'Colossal', function(art) {
            console.log(art.green)
            console.log(`Ready! Logged in as ${client.user.tag} - Serving ${client.guilds.cache.size} guilds`);
        })


        /**
         * Setting command devPermissions
         */
        const devFiles = fs.readdirSync('./commands/dev').filter(file => file.endsWith('.js'));
        const adminFiles = fs.readdirSync('./commands/admin').filter(file => file.endsWith('.js'));
        const commands = await client.application.commands.fetch()
        const devCommands = []
        for (const file of devFiles) {
            const command = require(`../commands/dev/${file}`);
            devCommands.push(command.data.name)
        }
        const adminCommands = []
        for (const file of adminFiles) {
            const command = require(`../commands/admin/${file}`);
            adminCommands.push(command.data.name)
        }
        const devPermissions = [
            {
                id: devId,
                type: 'USER',
                permission: true,
            },
        ];

        // for every guild the bot is in
        for (const guild of client.guilds.cache) {
            // find all guild admin roles
            const adminRoles = guild[1].roles.cache.filter(r => r.permissions.has("ADMINISTRATOR"))
            const adminPermissions = []
            for (const role of adminRoles) {
                adminPermissions.push({
                    id: role[1].id,
                    type: 'ROLE',
                    permission: true,
                },)
            }

            // and for every command the bot has
            for (const command of commands.entries()) {
                // if command matches any of the dev commands, update permission to myself only
                if (devCommands.includes(command[1].name)) {
                    console.log(`Changing permissions for ${command[1].name} - dev command`)
                    await command[1].setDefaultPermission(false)
                    await command[1].permissions.set({ guild: guild[1].id, permissions: devPermissions })
                }
                // of command matches any of the admin commands, update permissions to admin only
                if (adminCommands.includes(command[1].name)) {
                    console.log(`Changing permissions for ${command[1].name} - admin command`)
                    await command[1].setDefaultPermission(false)
                    await command[1].permissions.set({ guild: guild[1].id, permissions: adminPermissions })
                }

            }
        }

    },
};