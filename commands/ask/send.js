module.exports = async (Discord, Client, message, roleId, question) => {
    try {

        let role = await message.guild.roles.cache.get(roleId).members

        role.forEach(mem => {
            if (mem.user.bot == true) return;

            Client.users.fetch(mem.user.id, false).then(async user => {
                let dm = await user.send({ content: question }).catch(() => { message.channel.send(`Could not send to this user: <@!id>`) });
                let filter = m => m.author.bot != true;
                let collector = dm.channel.createMessageCollector({ filter, max: 1 });

                collector.on('collect', async collected => {
                    user.send("Your response has been sent! Thank you!")
                    message.reply(`<@!${message.author.id}> ${collected.author.username} says ${collected.content}`);
                });

            });
        });

        return;
    } catch (err) {
        console.log(err);
        return message.reply(`An error occured whilst sending question.`)
    }
}