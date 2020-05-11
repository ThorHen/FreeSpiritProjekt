// Google Cloud Firstore setup
const admin = require('firebase-admin');
const serviceAccount = require('../FreeSpiritdb.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// DB setup
const db = admin.firestore();

exports.getUserNames = async () => {
    return snapshot = await db.collection('Users').get()
}
exports.getUserDocumentID = async (user) => {
    const snapshot = await db.collection('Users').where('Name', '==', user).get()
    if (snapshot.empty) {
        return
    } else {
        return snapshot.docs[0].id
    }
}
exports.deleteUser = async (id) => {
    await db.collection('Users').doc(id).delete();
}

exports.getSpecificUserPassword = async (userName) => {
    const snapshot = await db.collection('Users')
        .where('Username', '==', userName).get();
    if (snapshot.empty) {
        return;
    } else {
        const hashedPassword = snapshot.docs[0].data().Password
        return hashedPassword;
    }
}

exports.getUserPermissions = async (userName) => {
    return userPermissions = await db.collection('Users')
        .where('Username', '==', userName).get();
}

exports.getAllTrainingForms = async () => {
    return trainingForms = await db.collection('TrainingForms').get()
}

exports.getAllExercises = async () => {
    return exercises = await db.collection('Exercises').get()
}

exports.getTrainingExercises = async (trainingForm) => {
    return trainingFormExercises = await db.collection('TrainingForms')
        .where('Name', '==', trainingForm).get()
}

exports.getExerciseInfo = async (exercise) => {
    return exerciseSnapshot = await db.collection('Exercises')
        .where('Name', '==', exercise).get()
}

exports.getExercisesByTag = async (tag) => {
    return snapshot = await db.collection('Exercises').get()
}