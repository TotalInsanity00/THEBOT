const mongoose = require('mongoose');

const scoresheetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number
})

module.exports = new mongoose.model("test", scoresheetSchema, "test")