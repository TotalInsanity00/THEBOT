const mongoose = require('mongoose');
require('dotenv').config();


module.exports = {
    init: async () => {
        const dbOptions = {
            maxPoolSize: 50,
            wtimeoutMS: 2500,
            useNewUrlParser: true
        };

        console.log(`⭕ Attempting to connect to the database...`);
       await mongoose.connect(`mongodb+srv://THEBOTUser:${process.env.DBPASS}@thebot.nynflcy.mongodb.net/?retryWrites=true&w=majority`, dbOptions).then(() => { console.log(`✔️ THEBOT has connected to MongoDB`) })
    }
}