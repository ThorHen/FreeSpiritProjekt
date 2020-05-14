/** Documentation written by John Høeg */
/** Init Express and Controllers. */ 
const express = require('express');
const app = express();
const AdminController = require('../Controllers/AdminController');
const MaterialController = require('../Controllers/MaterialController');
const loginController = require('../Controllers/LoginController')
const sessionConfig = require('../SessionSecret.json');
const userController = require('../Controllers/UserController');
/** Set up routing, Pug and Server. */
app.set('view engine', 'pug');
app.set('views', __dirname + '\\Views');
app.use(express.static('Server'));
/** Encoding of 'post' request data. */
app.use(express.json());
app.use(express.urlencoded());

session = require('express-session');
app.use(session(sessionConfig));
/** Generating SessionID for Login-status. */
function authenticateLoginStatus(req, res, next) {
    if(req.session.loggedIn) {
        return next();
    }
    else {
        res.redirect('/login')
    }
}
/** Checking to see if user is Admin and restricting access to certain pages if user is not. */
function isAdmin(req, res, next) {
    if(req.session.admin == '1') {
        return next();
    }
    else {
        res.send('Du har ikke admin privilegier');
    }
}
/** Redirecter to login page from root. */
app.get('/', async (req, res) => {
    res.redirect('/login');
})
/** Displaying admin page. */
app.get('/admin', isAdmin, async (req, res) => {
    const title = 'Admin';
    const users = await AdminController.getUsernames();
    res.render('AdminPage', { users: users, title: title });
})
/** Deleteing a chosen user.
 * @param id = Username
 */
app.post('/admin/slet/:id', isAdmin, async (req, res) => {
    const id = req.params.id
    await AdminController.deleteUser(id)
    res.redirect('/admin')
})
/** 
 * Displaying editing page for a chosen user.
 * @param id = Username
 */
app.get('/admin/redigerbruger/:id', isAdmin, async (req, res) => {
    const id = req.params.id
    const userData = await AdminController.getSpecificUserData(id)
    const trainingTypes = await MaterialController.getAllTrainingForms()
    const title = 'Rediger bruger: ' + id
    req.session.updateUser = id;
    res.render('EditUser', { title: title, id: id, userData: userData, trainingTypes: trainingTypes })
})
/** Confirm editing a chosen user from edit page. */
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
/** Displaying trainingforms page with all trainingforms associated with logged in user. */
app.get('/traeningsformer', authenticateLoginStatus, async (req, res) => {
    let username = req.session.username;
    const title = 'Traeningsformer';
    const trainingforms = await MaterialController.getUserTrainingForms(username);
    res.render('TrainingForms', { trainingforms: trainingforms, title: title });
})
/**
 * Displaying Exercise list page with chosen trainingform and tag.
 * @param tf = Trainingforms
 * @param tag = Tags
 */
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
/** 
 * Displaying a specific Exercise.
 * @param oevelsesNavn = Øvelses navn
 */
app.get('/oevelse/:oevelsesNavn', authenticateLoginStatus, async (req, res) => {
    const oevelsesNavn = req.params.oevelsesNavn;
    const trainingForm = req.session.trainingform;
    const exercise = await MaterialController.getExerciseInfo(oevelsesNavn);
    res.render('Exercise', { exercise: exercise, title: oevelsesNavn, trainingForm: trainingForm });
})
/** Displaying the create user page. */
app.get('/opretbruger', isAdmin, async (req, res) => {
    let trainingTypes = await MaterialController.getAllTrainingForms();
    res.render('CreateUser', { trainingTypes: trainingTypes })
    res.end();
})
/** Confirm creating new user. */
app.post('/createnewuser', isAdmin, async (req, res) => {
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
/** Displaying login page.*/
app.get('/login', async (req, res) => {
    res.render('Login');
    res.end();
});
/** Authenticating login, and setting Sessions. */
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
/** Redirecting to login page while destroying Sessions. */
app.get('/logout', authenticateLoginStatus, (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})
/** Generating server on specified portnumber and confirmation console log. */
const portNumber = 8080;
app.listen(portNumber, () => console.log(`Server started on ${portNumber}`));