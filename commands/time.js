const fs = require("fs");
module.exports = {
    name: "time",
    aliases: ["timechange"],
    description: "Command for running the weekly schedule",
    type: "Admin",
    async execute(Discord, Client, message, args) {
        try {
            function changeTime(time, newTime) {
                switch (args[0].toLowerCase()) {
                    case "academy":
                    case 0:
                        time.academy = newTime;
                        break;
                    case "pg":
                    case 1:
                        time.bpb = newTime;
                        break;
                }

                fs.writeFileSync("./commands/data/times.json", JSON.stringify(time));
                return message.reply(`I've updated the time for ${args[0]} to ${newTime}`);

            }

            if (!args[0]) return message.reply(`Provide who you want to dm: ["Academy", "PG"]`);

            let time = JSON.parse(fs.readFileSync("./commands/data/times.json"));

            message.reply(`Provide a new time. (PG: ${time.bpb} | Academy: ${time.academy})`);
            let filter = m => m.author.id == message.author.id;
            let collector = message.channel.createMessageCollector({ filter, time: 60000, max: 1 });

            collector.on('collect', async collected => {
                let newTime = collected.content;

                changeTime(time, newTime);
                return;
            });

            return;
        } catch (err) {
            console.log(err);
            return message.reply(`Something went wrong with ${this.name} command.`);
        }
    }
}