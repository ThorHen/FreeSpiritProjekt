const dbController = require('../Controllers/dbController')

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
module.exports = { getUserNames }