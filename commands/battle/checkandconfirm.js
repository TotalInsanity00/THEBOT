const { MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const IdGet = require("../../database/models/battle/crewbattle")
module.exports = async (Discord, Client, message, object) => {
    try {

        let IdData = await IdGet.findOne()
        IdData.id += 1;
        object.other.id = IdData.id;

        let embed = new Discord.MessageEmbed()
            .setTitle(`An Event has been scheduled!`)
            .addFields(
                {
                    name: `Opponent:`,
                    value: ` ${object.opponent}`
                },
                {
                    name: "Times:",
                    value: `EST: ${object.times[0]}\nCST: ${object.times[1]}\nMST: ${object.times[2]}\nPST ${object.times[3]}\nBST: ${object.times[4]}`
                },
                {
                    name: "Sending to:",
                    value: `<@&${object.ids.ping}>`
                }
            )

        let row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle("PRIMARY")
                .setCustomId("yes")
                .setLabel("YES"),

            new MessageButton()
                .setStyle("DANGER")
                .setCustomId("no")
                .setLabel("NO")
        )

        let confirm = await message.reply({ embeds: [embed], components: [row] });

        let filter = m => m.user.id === message.author.id;
        let collector = confirm.createMessageComponentCollector({ filter, time: 45000, max: 1 });

        collector.on('collect', async collected => {
            await collected.deferUpdate();
            let id = collected.customId;

            if (id == "yes") {

                await IdData.save();
                
                let Newembed = new Discord.MessageEmbed()
                    .setTitle(`An Event has been scheduled!`)
                    .setDescription(`ID: ${object.other.id}`)
                    .addFields(
                        {
                            name: `Opponent:`,
                            value: ` ${object.opponent}`,
                            inline: true
                        },
                        {
                            name: "Streamer:",
                            value: `Currently none`,
                            inline: true
                        },
                        {
                            name: "Times:",
                            value: `EST: ${object.times[0]}\nCST: ${object.times[1]}\nMST: ${object.times[2]}\nPST ${object.times[3]}\nBST: ${object.times[4]}`
                        }
                    )

                    let Newmessage = await message.guild.channels.cache.get(`${object.ids.send}`).send({content: `<@&${object.ids.ping}>`, embeds: [Newembed]});
                    
                    object.other.mid = Newmessage.id;
                    await object.save();
            }

            return;
        })

    } catch (err) {
        console.log(err);
        return message.reply(`An error occured whilst recieving the question.`);
    }

}