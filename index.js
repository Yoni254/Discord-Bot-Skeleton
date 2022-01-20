// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./configs/config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const adminFiles = fs.readdirSync('./commands/admin').filter(file => file.endsWith('.js'));
const devFiles = fs.readdirSync('./commands/dev').filter(file => file.endsWith('.js'));
const modFiles = fs.readdirSync('./commands/mod').filter(file => file.endsWith('.js'));
const userFiles = fs.readdirSync('./commands/user').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

function loadCommand(path, dir) {
    for (const file of dir) {
        const command = require(`${path}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

loadCommand('./commands/admin', adminFiles)
loadCommand('./commands/dev', devFiles)
loadCommand('./commands/mod', modFiles)
loadCommand('./commands/user', userFiles)

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }

});

// Login to Discord with your client's token
client.login(token);