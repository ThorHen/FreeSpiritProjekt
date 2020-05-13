const dbController = require('./dbController');
const loginController = require('./LoginController');

async function createNewUser(admin, name, email, username, password, permissions, title) {

    let hashedPassword = await loginController.saltAndHashPassword(password);

    let newUser = dbController.createUser(admin, name, email, username, hashedPassword, permissions, title);

    return newUser;
}

async function getUserType(username) {
    const returnedUser = await dbController.getUser(username);
    if (!returnedUser) {
        return;
    } else {
        return {titles: returnedUser.titles, admin: returnedUser.admin, permissions: returnedUser.permissions};
    }
}

module.exports = {createNewUser, getUserType};