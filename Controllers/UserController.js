const dbController = require('./dbController');
const loginController = require('./LoginController');

async function createNewUser(admin, name, email, username, password, permissions, title) {

    let hashedPassword = await loginController.saltAndHashPassword(password);

    let newUser = dbController.createUser(admin, name, email, username, hashedPassword, permissions, title);

    return newUser;
}

module.exports = {createNewUser};