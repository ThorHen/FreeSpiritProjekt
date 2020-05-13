const express = require('express')
const app = express()
const AdminController = require('../Controllers/AdminController')
const MaterialController = require('../Controllers/MaterialController')

app.set('view engine', 'pug')
app.set('views', __dirname + '\\Views')
app.use(express.static('Server'))
app.use(express.json());
app.use(express.urlencoded());
session = require('express-session');
app.use(session({
    secret: 'ADCC58BA-6703-4795-B94D-6C562784DAEB'
    //TODO set expire
}));

app.get('/admin', async (req, res) => {
    const title = 'Admin'
    const users = await AdminController.getUserNames()
    res.render('AdminPage', { users: users, title: title })
})

app.post('/admin/slet/:id', async (req, res) => {
    const id = req.params.id
    console.log(id);
    await AdminController.deleteUser(id)
    res.redirect('/admin')
})

app.get('/admin/redigerbruger/:id', async (req, res) => {
    const id = req.params.id
    const userData = await AdminController.getSpecificUserData(id)
    const trainingTypes = await MaterialController.getAllTrainingForms()
    const title = 'Rediger bruger: ' + id
    // console.log(userData);
    req.session.updateUser = id;
    res.render('EditUser', { title: title, id: id, userData: userData, trainingTypes: trainingTypes })
})
app.post('/admin/redigerbruger/updateuser', async (req, res) => {
    let id = req.body.id;
    let admin = req.body.admin;
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let permissions = [];
    let titles = [];

    let trainingForms = await MaterialController.getAllTrainingForms();
    for (tf of trainingForms) {
        if (req.body.hasOwnProperty(tf)) {
            permissions.push(tf);
        }
    }
    if (req.body.hasOwnProperty('Instruktoer')) titles.push('Intruktoer');
    if (req.body.hasOwnProperty('Leder')) titles.push('Leder');
    if (req.body.hasOwnProperty('Rengoering')) titles.push('Rengoering');
    await AdminController.editUserData(id, admin, email, name, permissions, titles, username)
    res.redirect('/admin')
})
app.get('/traeningsformer', async (req, res) => {
    const title = 'Traeningsformer'
    const trainingforms = await MaterialController.getAllTrainingForms()
    res.render('TrainingForms', { trainingforms: trainingforms, title: title })
})

app.get('/oevelser/:tf/:tag', async (req, res) => {
    const tag = req.params.tag
    const trainingForm = req.params.tf
    req.session.trainingform = trainingForm
    const title = 'Oevelser'
    let exercises = []
    if (tag === 'alle') {
        exercises = await MaterialController.getTrainingExercises(trainingForm)
    } else {
        exercises = await MaterialController.getExercisesByTrainingformAndTag(trainingForm, tag)
    }
    res.render('Exercises', { exercises: exercises, title: title })
})

app.get('/oevelse/:id', async (req, res) => {
    const id = req.params.id
    const trainingForm = req.session.trainingform
    const exercise = await MaterialController.getExerciseInfo(id)
    res.render('Exercise', { exercise: exercise, title: id, trainingForm: trainingForm })
})
app.listen(8080, () => console.info('Server startet on 8080'))