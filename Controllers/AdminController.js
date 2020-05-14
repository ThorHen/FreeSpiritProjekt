/** Documentation written by John Høeg */
/** Initialising connection to Database Controller. */
const dbController = require('./DBController')
/** Function to get all user by username. */
async function getUsernames() {
    const snapshot = await dbController.getUsers()
    if (snapshot.empty) {
        return;
    } else {
        let result = [];
        snapshot.forEach(element => {
            result.push(element.data().username);
        });
        result.sort()
        return result
    }

}
/**
 * Function to get a specific user by supplying username.
 * @param {String} user - Username
 */
async function getSpecificUserData(user) {
    const returnedUser = await dbController.getUser(user)
    if (!returnedUser) {
        return
    } else {
        let specificUser = []
        specificUser.push(returnedUser.admin)
        specificUser.push(returnedUser.email)
        specificUser.push(returnedUser.name)
        specificUser.push(returnedUser.permissions)
        specificUser.push(returnedUser.titles)
        specificUser.push(returnedUser.username)
        return specificUser
    }
}
/**
 * Function to edit a chosen user with new values.
 * @param {String} oldusername - Username
 * @param {String} admin - 1 or 0
 * @param {String} email - Email
 * @param {String} name - Users name
 * @param {Array} permissions - Traningforms allowed to view.
 * @param {Array} titles - Associated titles.
 * @param {String} username - Username
 */
async function editUserData(oldusername, admin, email, name, permissions, titles, username) {
    let docId = await dbController.getUserDocumentID(oldusername)
    let data = {
        admin: admin,
        email: email,
        name: name,
        permissions: permissions,
        titles: titles,
        username: username
    }
    await dbController.editUser(docId, data)
}
/**
 * Function to delete a chosen user by username.
 * @param {String} username - Username
 */
async function deleteUser(username) {
    if (!username) {
        return
    } else {
        let docid = await dbController.getUserDocumentID(username)
        await dbController.deleteUser(docid)
    }
}
/** Exporting all functions to be used other places. */
module.exports = { getUsernames, deleteUser, getSpecificUserData, editUserData }