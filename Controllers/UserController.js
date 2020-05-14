const dbController = require('./DBController');
const loginController = require('./LoginController');

/**
 * Function that creates a new user in the database collection 'Users' by making call to the createUser function in DBController.js
 * @param {String} admin a value representing whether or not user is administrator. Should be either '0' or '1'
 * @param {String} name of user
 * @param {String} email of user
 * @param {String} username of user
 * @param {String} password (plaintext) to be salted and hashed by the saltAndHashPassword function of LoginController.js
 * @param {Array} permissions array of a given users privileges. Values should be the name of the training forms as a string the user has acces to.
 * @param {Array} titles job title of user. Should be either 'Leder', 'Instruktoer', or 'Rengoering'
 * 
 * returns the newly created user object
 */
async function createNewUser(admin, name, email, username, password, permissions, titles) {

    let hashedPassword = await loginController.saltAndHashPassword(password);

    let newUser = dbController.createUser(admin, name, email, username, hashedPassword, permissions, titles);

    return newUser;
}

/**
 * Function that makes a select from the database by making call to the getUser function of DBController.js.
 * @param {String} username of the user one wants to find in the DB.
 * 
 * Returns not the user object, but select variables from the user object. For use in acces control.
 */
async function getUserType(username) {
    const returnedUser = await dbController.getUser(username);
    if (!returnedUser) {
        return;
    } else {
        return {titles: returnedUser.titles, admin: returnedUser.admin, permissions: returnedUser.permissions};
    }
}

module.exports = {createNewUser, getUserType};