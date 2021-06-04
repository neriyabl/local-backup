const mongoose = require("mongoose");
const Device =  require("./Device");

const connectDb = () => mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true, useUnifiedTopology: true });

const models = { Device };

module.exports = {connectDb, models}
