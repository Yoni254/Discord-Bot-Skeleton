const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./configs/config.json');

const commands = []


const adminFiles = fs.readdirSync('./commands/admin').filter(file => file.endsWith('.js'));
const devFiles = fs.readdirSync('./commands/dev').filter(file => file.endsWith('.js'));
const modFiles = fs.readdirSync('./commands/mod').filter(file => file.endsWith('.js'));
const userFiles = fs.readdirSync('./commands/user').filter(file => file.endsWith('.js'));

function loadCommand(path, dir) {
    for (const file of dir) {
        const command = require(`${path}/${file}`);
        console.log(`Registering command from ${file} in ${path.substring(11)}`)
        commands.push(command.data.toJSON());
    }
}
loadCommand('./commands/admin', adminFiles)
loadCommand('./commands/dev', devFiles)
loadCommand('./commands/mod', modFiles)
loadCommand('./commands/user', userFiles)

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);