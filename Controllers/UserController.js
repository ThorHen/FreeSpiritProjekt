const dbController = require('./dbController');
const loginController = require('./LoginController');

/**
 * Function that creates a new user in the database collection 'Users' by making call to the createUser function in DBController.js
 * @param {*} admin a value representing whether or not user is administrator. Should be either '0' or '1'
 * @param {*} name of user
 * @param {*} email of user
 * @param {*} username of user
 * @param {*} password (plaintext) to be salted and hashed by the saltAndHashPassword function of LoginController.js
 * @param {*} permissions array of a given users privileges. Values should be the name of the training forms as a string the user has acces to.
 * @param {*} title job title of user. Should be either 'Leder', 'Instruktoer', or 'Rengoering'
 * 
 * returns the newly created user object
 */
async function createNewUser(admin, name, email, username, password, permissions, title) {

    let hashedPassword = await loginController.saltAndHashPassword(password);

    let newUser = dbController.createUser(admin, name, email, username, hashedPassword, permissions, title);

    return newUser;
}

/**
 * Function that makes a select from the database by making call to the getUser function of DBController.js.
 * @param {*} username of the user one wants to find in the DB.
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