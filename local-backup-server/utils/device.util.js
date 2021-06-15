const crypto = require("crypto");
const AES_BIT_LEN = 128;
const BYTE_LEN = 8;

function generateKey() {
  return crypto.randomBytes(AES_BIT_LEN/BYTE_LEN);
}

module.exports = { generateKey };
