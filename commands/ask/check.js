const { MessageActionRow, MessageButton, Collection } = require('discord.js');
const send = require('./send');

module.exports = async (Discord, Client, message, roleId, question) => {
    try {

        let checkBed = new Discord.MessageEmbed()
            .setTitle(`Send out this question?`)
            .setColor("#1b1b1f")
            .setDescription(`Question: ${question}`)
            .addFields(
                {
                    name: `Sending to everyone with the role:`,
                    value: `<@&${roleId}>`
                }
            )

        let row = new Discord.MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId(`yes`)
                .setStyle("PRIMARY")
                .setLabel("YES"),

            new MessageButton()
                .setCustomId(`no`)
                .setStyle("DANGER")
                .setLabel("NO")
        )

        let msg = await message.reply({ embeds: [checkBed], components: [row] });

        let filter = m => m.user.id == message.author.id;
        let collector = msg.createMessageComponentCollector({ filter, max: 1, time: 600000 });

        collector.on("collect", async collected => {
            await collected.deferUpdate();

            if (collected.customId == "no") return msg.edit({ embeds: [checkBed] });
            send(Discord, Client, message, roleId, question);
            return;
        });
        
        return;
    } catch (err) {
        console.log(err);
        return message.reply(`An error occured whilst checking question.`)
    }
}