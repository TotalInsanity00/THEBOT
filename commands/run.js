const weekly = require("./cron/weekly");

module.exports = {
    name: "run",
    aliases: [],
    description: "Command for running the weekly schedule",
    type: "Admin",
    async execute(Discord, Client, message, args) {
        try {

            weekly(Discord, Client);
            return;
        } catch (err) {
            console.log(err);
            return message.reply(`Something went wrong with ${this.name} command.`);
        }
    }
}