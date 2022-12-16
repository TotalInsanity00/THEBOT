const { MessageAttachment, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "move",
    aliases: [],
    description: "Command for moving people in vc!",
    type: "Admin",
    async execute(Discord, Client, message, args) {
        try {
            if (!message.member.roles.cache.has("962287531653738516")) {
                if (!message.member.roles.cache.has("970261041479032872")) return message.reply(`You don't have permission to do this!`);
            }
            if (!message.mentions.members.first()) return message.channel.send(`You need to mention someone`);

            let member = message.mentions.members.first();

            if (!member.voice.channel) return message.reply(`That person isn't in a voice channel!`);
            let channels = await message.guild.channels.cache.filter(c => c.type == "GUILD_VOICE");

            let row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("vcselection")
                    .setPlaceholder(`Select a voice channel to move to`)
            )

            channels.forEach(channel => {
                row.components[0].addOptions([
                    {
                        label: channel.name,
                        value: channel.id,
                        descrption: `Move ${member.user.username} to ${channel.name}`
                    }
                ])
            });

            let msg = await message.reply({ content: `Where would you like to send ${member.user.username}`, components: [row] });
            let filter = m => m.user.id == message.author.id;
            let collector = msg.createMessageComponentCollector({ filter, max: 1, time: 60000 });

            collector.on('collect', async collected => {
                let id = collected.values[0];
                await collected.deferUpdate();
                
                member.voice.setChannel(id);
                return message.reply(`I've moved ${member.user.username}!`);
            })

        } catch (err) {
            console.log(err);
            return message.reply(`Something went wrong with ${this.name} command.`);
        }
    }
}