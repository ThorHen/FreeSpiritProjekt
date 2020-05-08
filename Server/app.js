const express = require("express")
const app = express()
const AdminController = require("../Controllers/AdminController")
const MaterialController = require("../Controllers/MaterialController")

app.set("view engine", "pug")
//app.set("views", "/Server/Views")
app.use(express.static("Server"))

session = require('express-session');
app.use(session({
    secret: 'ADCC58BA-6703-4795-B94D-6C562784DAEB'
    //TODO set expire
}));

app.get("/Admin", async (req, res) => {
    const title = "Admin"
    const users = await AdminController.getUserNames()
    res.render(__dirname + "/Views/AdminPage", { users: users, title: title })
})

app.get("/Traeningsformer", async (req, res) => {
    const title = "Traeningsformer"
    const trainingforms = await MaterialController.getAllTrainingForms()
    res.render(__dirname + "/Views/TrainingForms", { trainingforms: trainingforms, title: title })
})

app.get("/Oevelser/:tf", async (req, res) => {
    const trainingForm = req.params.tf
    req.session.trainingform = trainingForm
    const title = "Oevelser"
    const exercises = await MaterialController.getTrainingExercises(trainingForm)
    res.render(__dirname + "/Views/Exercises", { exercises: exercises, title: title })
})
app.get("/Oevelser/:tag/:dummy", async (req, res) => {
    const trainingForm = req.session.trainingform
    const tag = req.params.tag
    const title = "Oevelser"
    const exercises = await MaterialController.getExercisesByTrainingformAndTag(trainingForm, tag)
    res.render(__dirname + "/Views/Exercises", { exercises: exercises, title: title })
})

app.get("/Oevelse/:id", async (req, res) => {
    const id = req.params.id
    const exercise = await MaterialController.getExerciseInfo(id)
    res.render(__dirname + "/Views/Exercise", { exercise: exercise, title: id })
})
app.listen(8080, () => console.info("Server startet on 8080"))