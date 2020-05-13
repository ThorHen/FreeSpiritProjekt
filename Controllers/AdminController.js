const dbController = require('./dbController')

async function getUserNames() {
    const snapshot = await dbController.getUserNames()
    if (snapshot.empty) {
        return;
    } else {
        let result = [];
        snapshot.forEach(element => {
            result.push(element.data().Name);
        });
        result.sort()
        return result
    }

}
async function getSpecificUserData(user) {
    const snapshot = await dbController.getUserNames()
    if (snapshot.empty) {
        return
    } else {
        let specificUser = []
        snapshot.forEach(element => {
            if (element.data().Name == user) {
                specificUser.push(element.data().Admin)
                specificUser.push(element.data().Email)
                specificUser.push(element.data().Name)
                specificUser.push(element.data().Permissions)
                specificUser.push(element.data().Titel)
                specificUser.push(element.data().Username)
            }
        })
        return specificUser
    }
}

async function editUserData(user, admin, email, name, permissions, titel, username) {
    userId = await dbController.getUserDocumentID(user)
    let data = {
        Admin: admin,
        Email: email,
        Name: name,
        Permissions: permissions,
        Titel: titel,
        Username: username
    }
    dbController.editUser(userId, data)
}

async function deleteUser(user) {
    if (!user) {
        return
    } else {
        let id = await dbController.getUserDocumentID(user)
        await dbController.deleteUser(id)
    }
}
module.exports = { getUserNames, deleteUser, getSpecificUserData, editUserData }