const bcrypt = require('bcrypt');

const saltRounds = 12;

async function saltAndHashPassword(plaintextPassword) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

    const hashObj = {salt: salt, hashedPassword: hashedPassword};
    
    return hashObj;
}

async function comparePassword(plaintextPassword, hashedPassword) {
    const isSame = await bcrypt.compare(plaintextPassword, hashedPassword)

    return isSame;
}

async function login(username, password) {
    //Contact db for any users with given username (should utilize DBController function?)
    //if any exists return snapshot
    //if comparePassword(password, user.hashedPassword) => return true
    //else return false
}

module.exports = {saltAndHashPassword, comparePassword, login};