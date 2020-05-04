// Google Cloud Firstore setup
const admin = require("firebase-admin");
const serviceAccount = require("../FreeSpiritdb.json");
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
exports.getUserPermissions = async (userName) => {
    const userPermissions = await db.collection("Users")
        .where("Username", "==", userName).get();

    if (userPermissions.empty) {
        return;
    } else {
        return userPermissions.docs[0].data().Permissions;
    }
}
exports.getAllTrainingForms = async () => {
    const trainingForms = await db.collection("TrainingForms").get()

    if (trainingForms.empty) {
        return
    } else {
        let forms = []
        trainingForms.forEach(element => {
            forms.push(element.data().Name)
        });
        return forms
    }
}
exports.getUserTrainingForms = async (user) => {
    const userPermissions = await this.getUserPermissions(user)
    const trainingForms = await this.getAllTrainingForms()
    let result = []
    trainingForms.forEach(element => {
        if (userPermissions.includes(element)) {
            result.push(element)
        }
    })
    return result
}
exports.getAllExercises = async () => {
    const exercises = await db.collection("Exercises").get()

    if (exercises.empty) {
        return
    } else {
        let result = []
        exercises.forEach(element => {
            result.push(element.data().Name)
        });
        return result
    }
}
exports.getTrainingExercises = async (trainingForm) => {
    const trainingFormExercises = await db.collection("TrainingForms")
        .where("Name", "==", trainingForm).get()

    if (trainingFormExercises.empty) {
        return
    } else {
        return trainingFormExercises.docs[0].data().Exercises
    }
}
exports.getExerciseInfo = async (exercise) => {
    const exerciseSnapshot = await db.collection("Exercises")
        .where("Name", "==", exercise).get()

    if (exerciseSnapshot.empty) {
        return
    } else {
        let result = []/*
        exerciseSnapshot.forEach(element => {
            result.push(element.data())
        });*/
        result.push(exerciseSnapshot.docs[0].data().Description)
        result.push(exerciseSnapshot.docs[0].data().Links)
        result.push(exerciseSnapshot.docs[0].data().Name)
        result.push(exerciseSnapshot.docs[0].data().Tags)
        result.push(exerciseSnapshot.docs[0].data().YoutubeEmbed)
        console.log(result);


        return result
    }
}