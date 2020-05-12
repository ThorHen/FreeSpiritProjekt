const bcrypt = require('bcrypt');
const dbController = require('./dbController');

const saltRounds = 12;

async function saltAndHashPassword(plaintextPassword) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

    const hashObj = {salt: salt, hashedPassword: hashedPassword};
    
    return hashObj;
}

async function comparePassword(plaintextPassword, hashedPassword) {
    const isSame = await bcrypt.compare(plaintextPassword, hashedPassword);

    return isSame;
}

async function login(username, plaintextPassword) {
    //Contact db for any users with given username (should utilize DBController function?)
    let returnedUserPassword = await getSpecificUserPassword(username);
    

    let validLogin = await comparePassword(plaintextPassword, returnedUserPassword);

    return validLogin;
}

async function getSpecificUserPassword(username) {
    const returnedUser = await dbController.getUser(username);

    if(!returnedUser) {
        return;
    }
    else {
        return returnedUser.hashObj.hashedPassword;
    }
}

module.exports = {saltAndHashPassword, comparePassword, login, getSpecificUserPassword};