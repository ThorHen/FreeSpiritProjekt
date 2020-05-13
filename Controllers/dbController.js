// Google Cloud Firstore setup
const admin = require('firebase-admin');
const serviceAccount = require('../FreeSpiritdb.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// DB setup
const db = admin.firestore();

async function getUserNames() {
    return snapshot = await db.collection('Users').get()
}

async function getUser(username) {
    let snapshot = await db.collection('Users')
    .where('username', '==', username).get();

    let user = snapshot.docs[0].data();
    return user;
}

async function createUser(admin, name, email, username, hashedPassword, permissions, titles) {
    let newUser = {admin: admin, name: name, email: email, username: username, 
        hashObj: hashedPassword, permissions: permissions, titles: titles}

    db.collection('Users').add(newUser);

    return newUser;
}

async function getAllTrainingForms() {
    return trainingForms = await db.collection('TrainingForms').get()
}

async function getAllExercises() {
    return exercises = await db.collection('Exercises').get()
}

async function getTrainingExercises(trainingForm) {
    return trainingFormExercises = await db.collection('TrainingForms')
        .where('Name', '==', trainingForm).get()
}

async function getExerciseInfo(exercise) {
    return exerciseSnapshot = await db.collection('Exercises')
        .where('Name', '==', exercise).get()
}

module.exports = { getUserNames, getUser, getAllTrainingForms, getAllExercises, getTrainingExercises, getExerciseInfo, createUser }