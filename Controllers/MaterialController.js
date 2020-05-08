const dbController = require("../Controllers/dbController")

async function getUserPermissions(userName) {
    const userPermissions = await dbController.getUserPermissions(userName)
    if (userPermissions.empty) {
        return;
    } else {
        return userPermissions.docs[0].data().Permissions;
    }
}

async function getAllTrainingForms() {
    const trainingForms = await dbController.getAllTrainingForms()
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
async function getUserTrainingForms(user) {
    const userPermissions = await getUserPermissions(user)
    const trainingForms = await getAllTrainingForms()
    if (userPermissions.empty || trainingForms.empty) {
        return
    } else {
        let result = []
        trainingForms.forEach(element => {
            if (userPermissions.includes(element)) {
                result.push(element)
            }
        })
        return result
    }
}

async function getAllExercises() {
    const exercises = await dbController.getAllExercises()
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

async function getTrainingExercises(trainingForm) {
    const trainingFormExercises = await dbController.getTrainingExercises(trainingForm)
    if (trainingFormExercises.empty) {
        return
    } else {
        let exercises = []
        exercises = trainingFormExercises.docs[0].data().Exercises
        exercises.sort()        
        return exercises
    }
}

async function getExerciseInfo(exercise) {
    const exerciseSnapshot = await dbController.getExerciseInfo(exercise)
    if (exerciseSnapshot.empty) {
        return
    } else {
        let result = []
        result.push(exerciseSnapshot.docs[0].data().Description)
        result.push(exerciseSnapshot.docs[0].data().Links)
        result.push(exerciseSnapshot.docs[0].data().Name)
        result.push(exerciseSnapshot.docs[0].data().Tags)
        result.push(exerciseSnapshot.docs[0].data().YoutubeEmbed)
        return result
    }
}

async function getExercisesByTag(tag) {
    const snapshot = await dbController.getExercisesByTag(tag)
    if (snapshot.empty) {
        return
    } else {
        let result = []
        snapshot.forEach(element => {
            if (element.data().Tags.includes(tag)) {
                result.push(element.data().Name)
            }
        })
        result.sort()
        return result
    }
}

async function getExercisesByTrainingformAndTag(trainingform, tag) {
    const trainingFormExercises = await getTrainingExercises(trainingform)
    const exercisesByTag = await getExercisesByTag(tag)

    if (trainingFormExercises.empty || exercisesByTag.empty) {
        return
    } else {
        let result = []
        exercisesByTag.forEach(element => {
            if (trainingFormExercises.includes(element)) {
                if (!result.includes(element)) {
                    result.push(element)
                }
            }
        })
        result.sort()
        return result
    }
}
module.exports = {
    getUserPermissions, getAllTrainingForms, getUserTrainingForms, getAllExercises,
    getTrainingExercises, getExerciseInfo, getExercisesByTag, getExercisesByTrainingformAndTag
}