const fs = require('fs');

module.exports = (Discord, Client, message) => {

    const prefix = '!';
    const args = (message.content).slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const command = Client.commands.get(cmd) || Client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (!command) return;

    try {
        command.execute(Discord, Client, message, args);
    } catch (err) {
        console.log(err);
        return message.reply(`Something went wrong! ${command.name} command error'd.`);
    }
}