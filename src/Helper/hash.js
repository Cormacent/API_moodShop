const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    // salt is for random character
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt.hash(password, salt);
    return result;
  } catch (error) {
    throw error;
  }
}
module.exports = hashPassword;
