const weekly = require("./cron/weekly");
const findId = require("../database/models/battle/scoresheetSchema")

module.exports = {
    name: "changelineup",
    aliases: ["cl", "lineupchange"],
    description: "Command for assigning the lineup!",
    type: "Admin",
    async execute(Discord, Client, message, args) {
        try {

            if (!args[0]) return message.reply(`Provided a ID to update the lineup`);

            let requestedId = args[0];

            let IdFind = await findId.findOne({ "other.id": requestedId });

            if (!IdFind) return message.reply(`Could not find an event with the ID ${args[0]}`);

            let filter = m => m.author.id == message.author.id;
            let collector = message.channel.createMessageCollector({ filter, time: 45000, max: 1 });
            message.channel.send(`Type the players in the lineup, put a space between every player. DO NOT PUT SPACES IN PLAYER NAMES`);
            collector.on('collect', async collected => {
                let content = collected.content;

                IdFind.lineup = content.replaceAll(' ', "\n");

                await IdFind.save();
                return message.reply(`I've updated the lineup to:\n ${IdFind.lineup}`);
            })


        } catch (err) {
            console.log(err);
            return message.reply(`Something went wrong with ${this.name} command.`);
        }
    }
}