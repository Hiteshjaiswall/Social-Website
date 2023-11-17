const mongoose = require("mongoose");

mongoose.connect('mongodb://0.0.0.0/Social_app');

const db = mongoose.connection;

db.once('open', function () {
    console.log("Connected to the database");
});

db.on('error', function (err) {
    console.error("Error connecting to the database:", err);
});

module.exports = db;
