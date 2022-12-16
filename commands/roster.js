const weekly = require("./cron/weekly");
const findId = require("../database/models/battle/scoresheetSchema")

module.exports = {
    name: "lineup",
    aliases: [],
    description: "Command for assigning the lineup!",
    type: "Admin",
    async execute(Discord, Client, message, args) {
        try {

            if (!args[0]) return message.reply(`Provided a ID to update the lineup`);

            let requestedId = args[0];

            let IdFind = await findId.findOne({ "other.id": requestedId });

            if (!IdFind) return message.reply(`Could not find an event with the ID ${args[0]}`);

            return message.reply(`${IdFind.lineup}`);

        } catch (err) {
            console.log(err);
            return message.reply(`Something went wrong with ${this.name} command.`);
        }
    }
}