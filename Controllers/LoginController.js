const bcrypt = require('bcrypt');
const dbController = require('./DBController');

const saltRounds = 12;
/**
 * Generates a salt and hashes a plaintext password, then returns 
 * an object containing the salt and hashed password
 * @param {string} plaintextPassword Password in plain text to be hashed
 */
async function saltAndHashPassword(plaintextPassword) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

    const hashObj = { salt: salt, hashedPassword: hashedPassword };

    return hashObj;
}
/**
 * Compares a plaintext password and a hashed password, by hashing the plaintext
 * and comparing the two hashed strings. Returns a boolean value.
 * @param {string} plaintextPassword Password in plain text to hash and compare
 * @param {string} hashedPassword Already hashed password to compare to plaintext password
 */
async function comparePassword(plaintextPassword, hashedPassword) {
    const isSame = await bcrypt.compare(plaintextPassword, hashedPassword);

    return isSame;
}
/**
 * Validates the inputted username and password, returning a boolean value.
 * @param {string} username Inputted username to find password in database
 * @param {string} plaintextPassword Plaintext password to compare to hashed password found in database
 */
async function login(username, plaintextPassword) {
    let returnedUserPassword = await getSpecificUserPassword(username);


    let validLogin = await comparePassword(plaintextPassword, returnedUserPassword);

    return validLogin;
}
/**
 * Checks the given username exists in the database, returns said user's hashed password
 * @param {string} username Username to be checked in database
 */
async function getSpecificUserPassword(username) {
    const returnedUser = await dbController.getUser(username);

    if (!returnedUser) {
        return;
    }
    else {
        return returnedUser.hashObj.hashedPassword;
    }
}

module.exports = { saltAndHashPassword, comparePassword, login, getSpecificUserPassword };