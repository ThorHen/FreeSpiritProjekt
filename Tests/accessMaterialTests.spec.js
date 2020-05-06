const assert = require("chai").assert
const { getUserPermissions, getAllTrainingForms, getUserTrainingForms,
    getAllExercises, getTrainingExercises, getExerciseInfo,
    getExercisesByIdAndTag } = require("../Controllers/dbController")

before(async () => {
    result = await getUserPermissions("P1")
    exercise = await getExerciseInfo("Downward facing dog")
})
describe("Test of training form list", () => {
    it("p1 access is reformer and barre", () => {
        assert.equal(result.includes("Reformer"), true)
        assert.equal(result.includes("Barre"), true)
        assert.equal(result.length, 2)
    })
    it("Test show all training forms", async () => {
        let trainingForms = await getAllTrainingForms()
        assert.equal(trainingForms.includes("Barre"), true)
        assert.equal(trainingForms.includes("Yoga"), true)
        assert.equal(trainingForms.includes("Reformer"), true)
        assert.equal(trainingForms.length, 3)
    })
    it("Test get users training forms", async () => {
        let userTrainingForms = await getUserTrainingForms("P1")
        assert.equal(userTrainingForms.includes(result[0]), true)
        assert.equal(userTrainingForms.includes(result[1]), true)
        assert.equal(userTrainingForms.length, 2)
    })
})
describe("Test of exercises", () => {
    it("Test of get all exercises", async () => {
        const exercises = await getAllExercises()
        assert.equal(exercises.includes("Downward facing dog"), true)
        assert.equal(exercises.includes("Kriger2"), true)
        assert.equal(exercises.length, 2)
    })
    it("Test get exercises from training form", async () => {
        const trainingExercises = await getTrainingExercises("Yoga")
        assert.equal(trainingExercises.includes("Øvelse2"), true)
        assert.equal(trainingExercises.includes("Downward facing dog"), true)
        assert.equal(trainingExercises.length, 2)
    })
    it("Test get exercises by tag opvarmning", async () => {
        const exercises = await getExercisesByIdAndTag("P1", "Opvarmning")
        assert.equal(exercises.includes("Downward facing dog"), true)
        assert.equal(exercises.includes("Kriger2"), true)
        assert.equal(exercises.length, 2)
    })
    it("Test get exercises by tag nedkøling", async () => {
        const exercises = await getExercisesByIdAndTag("P1", "Nedkøling")
        assert.equal(exercises.includes("Downward facing dog"), true)
        assert.equal(exercises.length, 1)
    })
})
describe("Test of get 1 exercise", () => {
    it("Test get name of exercise", () => {
        assert.equal(exercise.includes("Downward facing dog"), true)
    })
    it("Test get description of exercise", () => {
        assert.equal(exercise.includes("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."), true)
    })
    it("Test get tags of exercise", () => {
        assert.equal(Array.isArray(exercise[3]), true)
        assert.equal(exercise[3].includes("Opvarmning"), true)
        assert.equal(exercise[3].includes("Nedkøling"), true)
        assert.equal(exercise[3].length, 2)
    })
    it("Test get youtube link of exercise", () => {
        assert.equal(exercise[4], "YqOqM79McYY")
    })
    it("Test get links of exercise", () => {
        assert.equal(Array.isArray(exercise[1]), true)
        assert.equal(exercise[1].includes("Link1"), true)
        assert.equal(exercise[1].includes("Link2"), true)
        assert.equal(exercise[1].length, 2)
    })
})