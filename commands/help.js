const weekly = require("./cron/weekly");
const findId = require("../database/models/battle/scoresheetSchema")
const fs = require("fs");

module.exports = {
    name: "helpme",
    aliases: [],
    description: "Command for giving you helpful tips!",
    type: "Admin",
    async execute(Discord, Client, message, args) {
        try {

            let commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

            let allCommands = []

            let embed = new Discord.MessageEmbed()
            .setTitle("All Commands");
            

            commands.forEach(cmd =>{
                let command = require(`../commands/${cmd}`);

                let newObject = {name: command.name, value: command.description}
                
                allCommands.push(newObject);
            })

            embed.fields = allCommands;

           return message.channel.send({embeds: [embed]});

        } catch (err) {
            console.log(err);
            return message.reply(`Something went wrong with ${this.name} command.`);
        }
    }
}