const { MessageAttachment } = require('discord.js');
const findId = require("../database/models/battle/scoresheetSchema")

module.exports = {
    name: "stream",
    aliases: ["streamer"],
    description: "Command for updating the streamer!",
    type: "Admin",
    description: "Deletes messages that are two weeks or less of age.",
    async execute(Discord, Client, message, args) {
        try {

            if (!args[0]) return message.reply(`Provided a ID to update the stream`);
            
            let requestedId = args[0];

            let IdFind = await findId.findOne({"other.id": requestedId});

            if (!IdFind) return message.reply(`Could not find an event with the ID ${args[0]}`);

            let eventMessage = await Client.channels.cache.get(`${IdFind.ids.send}`).messages.fetch(`${IdFind.other.mid}`);

            if (!eventMessage) return message.reply(`Event has been deleted, so I am unable to update the stream.`);
//eventMessage.embeds[0].fields

            let filter = m => m.author.id == message.author.id;
            let collector = message.channel.createMessageCollector({filter, time: 45000, max: 1});
            message.channel.send(`Send the stream **LINK** to the stream!`);
            collector.on('collect', async collected =>{
                let content = collected.content;

                IdFind.other.streamer = content;
                eventMessage.embeds[0].fields[1].value = content;

                await IdFind.save();
                eventMessage.edit({embeds: [eventMessage.embeds[0]]});
                message.channel.send("I've updated the stream link!");
                return;
            })

        } catch (err) {
            console.log(err);
            return message.reply(`An error occured whilst updating the streamer`);
        }
    }
}