const mongoose = require('mongoose');
const { connectionString } = require('../config');

const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        if (err) {
            throw err;
        } else {
            console.log("MongoDB connected")
        }
    });

module.export = connector;