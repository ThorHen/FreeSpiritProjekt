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
        console.log("her2");
        return;
    } else {
        let result = [];
        snapshot.forEach(element => {
            result.push(element.data().Name);
            console.log(element.data().Name);

        });
        console.log(result);

        return result;


    }
}