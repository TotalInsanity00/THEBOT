const mongoose = require('mongoose');

const scoresheetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    opponent: String,
    date: String,
    times: [],
    lineup: String,
    ids: {
        send: String,
        ping: String
    },
    other: {
        id: Number,
        streamer: String,
        mid: String
    }
})

module.exports = new mongoose.model("CrewBattle", scoresheetSchema, "scoresheets")