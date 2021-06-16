const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    name: String,
    key: Buffer,
    lastSync: Date,
    dir: String,
    serverMessage: Buffer,
    clientMessage: Buffer
  }
);

module.exports = mongoose.model("Device", deviceSchema);
