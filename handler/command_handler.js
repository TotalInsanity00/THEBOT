const fs = require('fs');

module.exports = async (Client, Discord) => {
    const command_files = await fs.readdirSync('./commands/').filter(file => file.endsWith(".js"));

    for (const file of command_files) {
        const command = require(`../commands/${file}`);

        if (command.name) {
            Client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}