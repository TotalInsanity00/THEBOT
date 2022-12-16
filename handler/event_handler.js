const fs = require('fs');

module.exports = (Client, Discord) => {
    const load_dir = (dirs) => {
        const event_files = fs.readdirSync(`./events/${dirs}`);

        for (const file of event_files) {
            const event = require(`../events/${dirs}/${file}`);
            const event_name = file.split('.')[0];
            Client.on(event_name, event.bind(null, Discord, Client))
        }
    }

    ['Client', 'guild'].forEach(e => load_dir(e));

}