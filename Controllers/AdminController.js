const dbController = require('./dbController')

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

async function deleteUser(username) {
    if (!username) {
        return
    } else {
        let docid = await dbController.getUserDocumentID(username)
        await dbController.deleteUser(docid)
    }
}
module.exports = { getUsernames, deleteUser, getSpecificUserData, editUserData }