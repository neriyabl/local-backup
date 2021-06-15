const { models: { Device } } = require("../models");
const { decryptMessage, generateKey } = require("../utils/device.util");

const createDevice = async (name) => {
  const device = new Device({
    name,
    key: generateKey(),
    lastSync: Date.now(),
    dir: `${process.env.BASE_DIR}${name}`,
    serverMessage: generateKey(),
    clientMessage: generateKey()
  });

  console.log("need to update real save");
  // await device.save();
  return device;
}

const getDevice = async (id) => {
  try{
    return Device.findById(id).exec();
  } catch {
    console.error(`fail to get device: ${id}`);
    return;
  }
}

const checkMessage = async (id, message) => {
  const device = await getDevice(id);
  if (!device) return;
  const { key, clientMessage } = device;
  const decryptedMessage = await decryptMessage(message, key);
  if (decryptedMessage === clientMessage) {
    return device;
  }
}

module.exports = {
  createDevice,
  checkMessage
}
