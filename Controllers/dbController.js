// Google Cloud Firstore setup
const admin = require("firebase-admin");
const serviceAccount = require("../FreeSpirit db.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// DB setup
const db = admin.firestore();


exports.getUserNames = async () => {
    const snapshot = await db.collection("Users").get()
    if (snapshot.empty) {
        return;
    } else {
        let result = [];
        snapshot.forEach(element => {
            result.push(element.data().Name);
        });
        result.sort()
        return result;
    }
}
exports.getSpecificUserPassword = async (userName) => {
    const snapshot = await db.collection("Users")
        .where("Username", "==", userName).get();
    if (snapshot.empty) {
        return;
    } else {
        const hashedPassword = snapshot.docs[0].data().Password
        return hashedPassword;
    }
}