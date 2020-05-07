const bcrypt = require('bcrypt');
//TODO require getSpecificUser() from DBController
const getSpecificUser = async (username) => {
    return {hashedPassword: '$2b$12$gHjLQgztJn1M8Lxr166QOuMhLfUnPiYdK448mKoneaGKat1mfaZde'};
}

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
    let returnedUser = await getSpecificUser(username);

    let validLogin = await comparePassword(plaintextPassword, returnedUser.hashedPassword);

    if(validLogin) {
        return true;
    }
    else {
        return false;
        //throw new Error('Invalid password');
    }
}

module.exports = {saltAndHashPassword, comparePassword, login};