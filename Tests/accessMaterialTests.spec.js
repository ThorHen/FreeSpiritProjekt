const assert = require('chai').assert;

//Methods to be tested in this file.
const { getAllTrainingForms, getUserTrainingForms,
    getAllExercises, getTrainingExercises, getExerciseInfo,
    getExercisesByTrainingformAndTag } = require('../Controllers/MaterialController');

let exercise;

before(async () => {
    exercise = await getExerciseInfo('Downward facing dog')
})

describe('Test suite of training form list', () => {
    it('Test of getAllTrainingForms()', async () => {
        let trainingForms = await getAllTrainingForms()
        assert.equal(trainingForms.includes('Barre'), true)
        assert.equal(trainingForms.includes('Yoga'), true)
        assert.equal(trainingForms.includes('Reformer'), true)
        //Only true as long as there only exists three training forms in DB. For development purposes
        assert.equal(trainingForms.length, 3)
    })
    it('Test of getUserTrainingForms', async () => {
        let userTrainingForms = await getUserTrainingForms('admin2')
        assert.equal(userTrainingForms.length, 3)
    })
})
describe('Test of execercise methods', () => {
    it('Test of getAllExcercises()', async () => {
        const exercises = await getAllExercises()
        assert.equal(exercises.includes('Downward facing dog'), true)
        assert.equal(exercises.includes('Kriger2'), true)
        assert.equal(exercises.length, 2)
    })
    it('Test of getTrainingExercises(trainingForm)', async () => {
        const trainingExercises = await getTrainingExercises('Yoga')
        assert.equal(trainingExercises.includes('Øvelse2'), true)
        assert.equal(trainingExercises.includes('Downward facing dog'), true)
        //Only true as long as DB collection 'Exercises' only contains two exercises. For development testing.
        assert.equal(trainingExercises.length, 2)
    })
    it('Test of getExercisesByTrainingFormAndTag(trainingForm, tag)', async () => {
        const exercises = await getExercisesByTrainingformAndTag('Reformer', 'Opvarmning')
        assert.equal(exercises.includes('Downward facing dog'), true)
        assert.equal(exercises.includes('Kriger2'), true)
        //Only true as long as DB collection 'Exercises' only contains two exercises with 'Opvarmning' tag. For development testing.
        assert.equal(exercises.length, 2)
    })
    it('Test of getExercisesByTrainingformAndTag(trainingForm, tag', async () => {
        const exercises = await getExercisesByTrainingformAndTag('Reformer', 'Nedkøling')
        assert.equal(exercises.includes('Downward facing dog'), true)
        //Only true as long as DB collection 'Exercises' only contains one exercise with 'Nedkøling' tag. For development testing.
        assert.equal(exercises.length, 1)
    })
})
describe('Test of getExerciseInfo(exercise)', () => {
    it('Test get name of exercise', () => {
        assert.equal(exercise.includes('Downward facing dog'), true)
    })
    it('Test get description of exercise', () => {
        assert.equal(exercise.includes('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'), true)
    })
    it('Test get tags of exercise', () => {
        assert.equal(Array.isArray(exercise[3]), true)
        assert.equal(exercise[3].includes('Opvarmning'), true)
        assert.equal(exercise[3].includes('Nedkøling'), true)
        assert.equal(exercise[3].length, 2)
    })
    it('Test get youtube link of exercise', () => {
        assert.equal(exercise[4], 'YqOqM79McYY')
    })
    it('Test get links of exercise', () => {
        assert.equal(Array.isArray(exercise[1]), true)
        assert.equal(exercise[1].includes('Link1'), true)
        assert.equal(exercise[1].includes('Link2'), true)
        assert.equal(exercise[1].length, 2)
    })
})