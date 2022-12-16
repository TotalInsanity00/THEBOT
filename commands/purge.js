const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "purge",
    aliases: [],
    description: "Command for deleting messages",
    type: "Admin",
    description: "Deletes messages that are two weeks or less of age.",
    async execute(Discord, Client, message, args) {
        try {

            if (!message.member.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply(`I don't have permission to delete messages!`);

            if (!args[0]) return message.reply(`Missing number argument`);
            let numDelete = Math.round(args[0]);

            if (!Number.isInteger(numDelete)) return message.reply(`Number provided is not a valid number. ${numDelete}`)

            if (numDelete < 2 || numDelete > 100) return message.reply(`Number ${numDelete} can only be between 2 and 100.`);

            message.delete();
            message.channel.bulkDelete(numDelete, true);

        } catch (err) {
            console.log(err);
            return message.reply(`An error occured whilst sending teh weekly schedule`);
        }
    }
}