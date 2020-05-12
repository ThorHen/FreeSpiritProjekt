const dbController = require('./dbController');

function createNewUser(admin, name, email, username, password, permissions, title) {
    let newUser = dbController.createUser(admin, name, email, username, password, permissions, title);

    return newUser;
}