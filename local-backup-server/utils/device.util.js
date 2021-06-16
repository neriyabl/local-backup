const crypto = require("crypto");
const AES_BIT_LEN = 128;
const BYTE_LEN = 8;
const ALGORITHM = "aes256";
const INPUT_ENCODING = 'utf8';
const OUTPUT_ENCODING = 'hex';
const IV_LENGTH = 16;

function generateKey() {
  return crypto.randomBytes(AES_BIT_LEN/BYTE_LEN);
}

function encryptMessage(message, key) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const ciphered = cipher.update(message, INPUT_ENCODING, OUTPUT_ENCODING);
  ciphered += cipher.final(OUTPUT_ENCODING);
  return iv.toString(OUTPUT_ENCODING) + ':' + ciphered
}

function decryptMessage(message, key) {
  const components = message.split(':');
  const iv_from_ciphertext = Buffer.from(components.shift(), OUTPUT_ENCODING);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv_from_ciphertext);
  const deciphered = decipher.update(components.join(':'), OUTPUT_ENCODING, INPUT_ENCODING);
  return deciphered + decipher.final(INPUT_ENCODING);
}

module.exports = {
  generateKey,
  encryptMessage,
  decryptMessage,
}
