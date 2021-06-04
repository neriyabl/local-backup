const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    name: String,
    key: String,
    lastSync: Date,
    dir: String,
    serverMessage: String,
    clientMessage: String
  }
);

module.exports = mongoose.model("Device", deviceSchema);
