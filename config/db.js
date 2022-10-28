const mongoose = require('mongoose');

const URI = "mongodb+srv://gyan:lol12345@cluster0.jtsnerp.mongodb.net/test"
mongoose.connect(URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`DATABASE CONNECTED `);
    })
    .catch(err => {
        console.log('mongodb error', err)
        process.exit(1)
    })