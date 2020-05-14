// Google Cloud Firstore setup
const admin = require('firebase-admin');
const serviceAccount = require('../FreeSpiritdb.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Database setup
const db = admin.firestore();
/**
 * Returns snapshot of all users from Database
 */
async function getUsers() {
    return snapshot = await db.collection('Users').get()
}
/**
 * Returns the documentID from the database
 * @param {string} username Username for the documentID
 */
async function getUserDocumentID(username) {
    const snapshot = await db.collection('Users').where('username', '==', username).get()
    if (snapshot.empty) {
        return
    } else {
        return snapshot.docs[0].id
    }
}
/**
 * Deletes document from the database
 * @param {string} id Id for the document
 */
async function deleteUser(id) {
    await db.collection('Users').doc(id).delete();
}
/**
 * Returns all information on a user from the database
 * @param {string} username Username for the wanted user
 */
async function getUser(username) {
    let snapshot = await db.collection('Users')
        .where('username', '==', username).get();

    let user = snapshot.docs[0].data();
    return user;
}
/**
 * Creates a new user in the database and returns it
 * @param {string} admin 0 or 1 to note whether user is admin or not
 * @param {string} name Name of the new user
 * @param {string} email Email of new user
 * @param {string} username Unique username for the new user
 * @param {array} hashedPassword Two strings: hashed password and salt
 * @param {array} permissions Access permissions for the user
 * @param {array} titles Titles the user has
 */
async function createUser(admin, name, email, username, hashedPassword, permissions, titles) {
    let newUser = {
        admin: admin, name: name, email: email, username: username,
        hashObj: hashedPassword, permissions: permissions, titles: titles
    }

    db.collection('Users').add(newUser);

    return newUser;
}
/**
 * Returns a snapshot of all the Trainingforms in the database
 */
async function getAllTrainingForms() {
    return trainingForms = await db.collection('TrainingForms').get()
}
/**
 * Returns a snapshot of all the Exercises in the database
 */
async function getAllExercises() {
    return exercises = await db.collection('Exercises').get()
}
/**
 * Returns snapshot of specific trainingform from database
 * @param {string} trainingForm The trainingform to get data on
 */
async function getTrainingform(trainingForm) {
    return await db.collection('TrainingForms')
        .where('Name', '==', trainingForm).get()
}
/**
 * Returns the data of an exercise from the database
 * @param {string} exercise The exercise to get data on
 */
async function getExerciseInfo(exercise) {
    let exerciseSnapshot = await db.collection('Exercises')
        .where('Name', '==', exercise).get()
    return exerciseSnapshot.docs[0].data();
}
/**
 * Edits a user document in the database
 * @param {string} userId The ID for the document to be edited
 * @param {array} data The updated data to replace the current data
 */
async function editUser(userId, data) {
    await db.collection('Users').doc(userId).update(data)
}

module.exports = { getUsers, getUser, getAllTrainingForms, getAllExercises, getTrainingform, getExerciseInfo, createUser, editUser, getUserDocumentID, deleteUser }
