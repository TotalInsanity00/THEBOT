const { MessageAttachment } = require('discord.js');
const newBattle = require("../database/models/battle/scoresheetSchema");
const mongoose = require("mongoose");
const checkandconfirm = require('./battle/checkandconfirm');
module.exports = {
    name: "battle",
    aliases: ["event"],
    description: "Command for creating battles",
    type: "Admin",
    description: "Deletes messages that are two weeks or less of age.",
    async execute(Discord, Client, message, args) {
        try {

            if (message.guildId != "962286523166916670") return message.reply(`You can only use this in the Pristine Guardians Server`);

            let AdvisorCheck = message.member.roles.cache.has("962287531653738516") || message.member.roles.cache.has("970261041479032872");

            if (AdvisorCheck == false) return message.reply(`You need to have the Owner or Co-Owner role!`);

            if (args.length < 6) {
                let missingArg;
                switch (args.length) {
                    case 0:
                        missingArg = `Decider ["Academy", "PG", "Pugs"]`
                        break;
                    case 1:
                        missingArg = "Month (September - 9)";
                        break;
                    case 2:
                        missingArg = "Day (September 4th - 04 / 4)";
                        break;
                    case 3:
                        missingArg = "Hour in 24Hr Clock (8pm EST - 20, 6pm EST - 18)";
                        break;
                    case 4:
                        missingArg = "Minute (830pm EST - 30)";
                        break;
                    case 5:
                        missingArg = "Team name"
                        break;
                }

                return message.reply(`Missing Argument - ${missingArg}`);
            }

            //Get date and check if Date is valid
            let date = new Date(`${args[1]}/${args[2]}/${new Date().getFullYear()}`);
            date.setHours(args[3])
            date.setMinutes(args[4])
            date.setSeconds(00)

            if (date.toString() == "Invalid Date") return message.reply(`Date is invalid. Make sure you are providing the correct arguments.`);

            let battleObject = await new newBattle({
                _id: mongoose.Types.ObjectId(),
                opponent: args.slice(5).join(" "),
                date: date.toLocaleDateString(),
                times: [
                    date.toLocaleString('en-us', { timeZone: `America/Detroit` }),
                    date.toLocaleString('en-us', { timeZone: `America/Chicago` }),
                    date.toLocaleString('en-us', { timeZone: `America/Denver` }),
                    date.toLocaleString('en-us', { timeZone: `America/Los_angeles` }),
                    date.toLocaleString('en-gb', { timeZone: `Europe/London`, hour12: true }),
                ],
                lineup: null,
                ids: {
                    send: "",
                    ping: ""
                },
                other: {
                    id: null,
                    streamer: null,
                    mid: null
                }
            });

            switch (args[0].toLowerCase()) {
                case "pg":
                case 1:
                case "pristine":
                    battleObject.ids.send = "962303511062790185";
                    battleObject.ids.ping = "962286743682424883";
                    break;
                case "academy":
                case 2:
                    battleObject.ids.send = "986548480824721509";
                    battleObject.ids.ping = "986542564129767475";
                    break;
                case "pugs":
                case 3:
                    battleObject.ids.send = "1033826760120340490";
                    battleObject.ids.ping = "967619480282865716";
            }

            checkandconfirm(Discord, Client, message, battleObject);
            return;
        } catch (err) {
            console.log(err);
            return message.reply(`An error occured whilst creating a battle`);
        }
    }
}