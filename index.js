const Discord = require('discord.js');
const mongoose = require(`./database/mongoose`);
const Client = new Discord.Client(
    {
        partials: ["MESSAGE", "CHANNEL", "REACTION"],
        intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES]
    }
); 
const Cron = require('cron')
Client.commands = new Discord.Collection();
Client.events = new Discord.Collection();
require('dotenv').config();

let weeklyPost = require(`./commands/cron/weekly`);

Client.on('ready', () => {
    
    Client.user.setPresence({ activities: [{ name: 'Currently fighting with Lightz 😤' }], status: 'idle' });

    let post = new Cron.CronJob(`00 00 00 * * 1`, () => weeklyPost(Discord, Client));
 
    post.start();

});

["command_handler", "event_handler"].forEach(handler => {
    require(`./handler/${handler}`)(Client, Discord);
});

mongoose.init();
Client.login(process.env.DISCORD_TOKEN);