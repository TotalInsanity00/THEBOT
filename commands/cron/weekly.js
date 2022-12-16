const moment = require("moment")
const fs = require(`fs`);

module.exports = async (Discord, Client) => {
    try {

        function getThisWeekDates() {
            let weekDates = [];

            for (let i = 1; i <= 7; i++) {
                weekDates.push(`${moment().day(i).format("dddd")} ${moment().day(i).format("L")}`);
            }

            return weekDates;
        }

        async function send(id, channel, time, weekDates) {

            channel.send(`<@&${id}>\nTeam Schedule for current week, (what day is better for you to do activities) i.e. scrims/vod reviews/games\n\nReact below ✅ to let us know if you can make it on this day ❌ if you cannot make it on this day`)

            for (let i = 0; i <= weekDates.length - 1; i++) {
                let me = await channel.send(`${weekDates[i]} - ${time}`);
                me.react(`✅`);
                me.react(`❌`);
            }

        }

        let thisWeekDates = getThisWeekDates();
        let academy = await Client.channels.cache.get("986548543122735125");
        let bpb = await Client.channels.cache.get("962302585526714388");
        let time = JSON.parse(fs.readFileSync("./commands/data/times.json"));

        await send("962286743682424883", bpb, `${time.bpb}`, thisWeekDates);
        await send("986542564129767475", academy, `${time.academy}`, thisWeekDates);

        return;

    } catch (err) {
        console.log(err);
        return message.reply(`An error occured whilst sending teh weekly schedule`);
    }

}