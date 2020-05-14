const dbController = require('./dbController');
const userController = require('./UserController');



async function getAllTrainingForms() {
    const trainingForms = await dbController.getAllTrainingForms()
    if (trainingForms.empty) {
        return;
    } else {
        let forms = [];
        trainingForms.forEach(element => {
            forms.push(element.data().Name)
        });
        return forms
    }
}
async function getUserTrainingForms(user) {
    const userType = await userController.getUserType(user)
    const userPermissions = userType.permissions;
    const trainingForms = await getAllTrainingForms();
    if (userPermissions.length === 0 || trainingForms.empty) {
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
    const trainingFormExercises = await dbController.getTrainingform(trainingForm)
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
    const exerciseInfo = await dbController.getExerciseInfo(exercise)
    if (!exerciseInfo) {
        return
    } else {
        let result = []
        result.push(exerciseInfo.Description)
        result.push(exerciseInfo.Links)
        result.push(exerciseInfo.Name)
        result.push(exerciseInfo.Tags)
        result.push(exerciseInfo.YoutubeEmbed)

        return result
    }
}

async function getExercisesByTag(tag) {
    const snapshot = await dbController.getAllExercises();
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
    const trainingFormExercises = await getTrainingform(trainingform)
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
    getAllTrainingForms, getUserTrainingForms, getAllExercises,
    getTrainingExercises, getExerciseInfo, getExercisesByTag, getExercisesByTrainingformAndTag
}