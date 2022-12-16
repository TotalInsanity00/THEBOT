const question = require("./ask/question");

module.exports = {
    name: "ask",
    aliases: [],
    description: "Command for asking players stuff",
    type: "Admin",
    async execute(Discord, Client, message, args) {
        try {

            if (!args[0]) return message.reply(`Provide who you want to dm: ["Academy", "PG", "TryoutPG", "TryoutAcademy", "Streamer", "pgcoach", "academycoach"]`);

            let roleId;

            switch (args[0].toLowerCase()) {
                case "academy":
                case 0:
                    roleId = "986542564129767475"
                    break;
                case "pg":
                case 1:
                    roleId = "962286743682424883"
                    break;
                case "tryoutacademy":
                case 2:
                    roleId = "986542565266440232"
                    break;
                case "tryoutpg":
                case 3:
                    roleId = "962311264888057906"
                    break;
                case "streamer":
                case 4:
                    roleId = "1037590180628013056"
                    break;
                case "pgcoach":
                case 5:
                    roleId = "962286999748894730";
                    break;
                case "academycoach":
                    roleId = "986542562661789737";
                    break;
            }

            question(Discord, Client, message, roleId);
            return;
        } catch (err) {
            console.log(err);
            return message.reply(`Something went wrong with ${this.name} command.`);
        }
    }
}