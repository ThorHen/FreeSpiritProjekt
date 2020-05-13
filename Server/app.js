const express = require('express');
const app = express();
const AdminController = require('../Controllers/AdminController');
const MaterialController = require('../Controllers/MaterialController');
const loginController = require('../Controllers/LoginController')
const sessionConfig = require('../SessionSecret.json');
const userController = require('../Controllers/UserController');

app.set('view engine', 'pug');
app.set('views', __dirname + '\\Views');
app.use(express.static('Server'));

//Encoding of 'post' request data
app.use(express.json());
app.use(express.urlencoded());

session = require('express-session');
app.use(session(sessionConfig));

function authenticateLoginStatus(req, res, next) {
    if(req.session.loggedIn) {
        return next();
    }
    else {
        res.redirect('/login')
    }
}

function isAdmin(req, res, next) {
    if(req.session.admin == '1') {
        return next();
    }
    else {
        res.send('Du har ikke admin privilegier');
    }
}

app.get('/', async (req, res) => {
    res.redirect('/login');
})

app.get('/admin', isAdmin, async (req, res) => {
    const title = 'Admin';
    const users = await AdminController.getUsernames();
    res.render('AdminPage', { users: users, title: title });
})

app.post('/admin/slet/:id', isAdmin, async (req, res) => {
    const id = req.params.id
    console.log(id);
    await AdminController.deleteUser(id)
    res.redirect('/admin')
})

app.get('/admin/redigerbruger/:id', isAdmin, async (req, res) => {
    const id = req.params.id
    const userData = await AdminController.getSpecificUserData(id)
    const trainingTypes = await MaterialController.getAllTrainingForms()
    const title = 'Rediger bruger: ' + id
    req.session.updateUser = id;
    res.render('EditUser', { title: title, id: id, userData: userData, trainingTypes: trainingTypes })
})

app.post('/admin/redigerbruger/updateuser', isAdmin, async (req, res) => {
    let oldusername = req.body.oldusername;
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
    await AdminController.editUserData(oldusername, admin, email, name, permissions, titles, username)
    res.redirect('/admin')
})

app.get('/traeningsformer', authenticateLoginStatus, async (req, res) => {
    const title = 'Traeningsformer';
    const trainingforms = await MaterialController.getAllTrainingForms();
    res.render('TrainingForms', { trainingforms: trainingforms, title: title });
})

app.get('/oevelser/:tf/:tag', authenticateLoginStatus, async (req, res) => {
    const tag = req.params.tag;
    const trainingForm = req.params.tf;
    req.session.trainingform = trainingForm;
    const title = 'Oevelser';
    let exercises = [];
    if (tag === 'alle') {
        exercises = await MaterialController.getTrainingExercises(trainingForm);
    } else {
        exercises = await MaterialController.getExercisesByTrainingformAndTag(trainingForm, tag);
    }
    res.render('Exercises', { exercises: exercises, title: title });
})

app.get('/oevelse/:id', authenticateLoginStatus, async (req, res) => {
    const id = req.params.id;
    const trainingForm = req.session.trainingform;
    const exercise = await MaterialController.getExerciseInfo(id);
    res.render('Exercise', { exercise: exercise, title: id, trainingForm: trainingForm });
})

app.get('/opretbruger', isAdmin, async (req, res) => {
    let trainingTypes = await MaterialController.getAllTrainingForms();

    res.render('CreateUser', { trainingTypes: trainingTypes })
    res.end();
})

app.post('/createnewuser', isAdmin, async (req, res) => {
    console.log(req.body);

    let admin = req.body.admin;
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let repeatPassword = req.body.repeatPassword;
    let permissions = [];

    let trainingForms = await MaterialController.getAllTrainingForms();
    for (tf of trainingForms) {
        if (req.body.hasOwnProperty(tf)) {
            permissions.push(tf);
        }
    }

    let titles = [];
    if (req.body.hasOwnProperty('Instruktoer')) titles.push('Intruktoer');
    if (req.body.hasOwnProperty('Leder')) titles.push('Leder');
    if (req.body.hasOwnProperty('Rengoering')) titles.push('Rengoering');
    if (password == repeatPassword) {
        userController.createNewUser(admin, name, email, username, password, permissions, titles);
        res.redirect('/admin');
    }
    else {
        res.render('CreateUser', {trainingTypes: trainingForms, error: 'Password felterne stemmer ikke overens'})
    }

    res.end()
})

app.get('/login', async (req, res) => {
    res.render('Login');
    res.end();
});

app.post('/auth', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const validLogin = await loginController.login(username, password);

    if (validLogin) {
        let userType = await userController.getUserType(username);
        //req.session.titles = userType.titles;
        req.session.admin = userType.admin;
        req.session.permissions = userType.permissions;
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/traeningsformer');
    }
    else {
        res.render('login', { error: 'Invalid username or password' });
    }
    res.end();
});

app.get('/logout', authenticateLoginStatus, (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

const portNumber = 8080;
app.listen(portNumber, () => console.log(`Server started on ${portNumber}`));