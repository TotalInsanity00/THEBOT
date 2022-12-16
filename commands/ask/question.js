const check = require(`./check`);
module.exports = async (Discord, Client, message, roleId) => {
    try {
        let filter = m => m.author.id == message.author.id;
        let collector = message.channel.createMessageCollector({ filter, time: 600000, max: 1 });

        message.channel.send(`Ask your question, you have 10 minutes.`)

        collector.on('collect', async collected => {
            let question = collected.content;

            check(Discord, Client, message, roleId, question);
            return;
        });

        return;
    } catch (err) {
        console.log(err);
        return message.reply(`An error occured whilst recieving the question.`);
    }

}