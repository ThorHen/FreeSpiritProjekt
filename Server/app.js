const express = require("express")
const app = express()
const AdminController = require("../Controllers/AdminController")
const MaterialController = require("../Controllers/MaterialController")

app.set("view engine", "pug")
app.set("views", __dirname + "\\Views")
app.use(express.static("Server"))

session = require('express-session');
app.use(session({
    secret: 'ADCC58BA-6703-4795-B94D-6C562784DAEB'
    //TODO set expire
}));

app.get("/Admin", async (req, res) => {
    const title = "Admin"
    const users = await AdminController.getUserNames()
    res.render("AdminPage", { users: users, title: title })
})

app.get("/Traeningsformer", async (req, res) => {
    const title = "Traeningsformer"
    const trainingforms = await MaterialController.getAllTrainingForms()
    res.render("TrainingForms", { trainingforms: trainingforms, title: title })
})

app.get("/Oevelser/:tf/:tag", async (req, res) => {
    const tag = req.params.tag
    const trainingForm = req.params.tf
    console.log(trainingForm);
    req.session.trainingform = trainingForm
    console.log(trainingForm);
    const title = "Oevelser"
    let exercises = []
    if (tag==="alle") {
        exercises = await MaterialController.getTrainingExercises(trainingForm)
    } else {
        exercises = await MaterialController.getExercisesByTrainingformAndTag(trainingForm, tag)
        console.log(exercises);
    }




    res.render("Exercises", { exercises: exercises, title: title , trainingForm: trainingForm})
})

app.get("/Oevelse/:tf/:id", async (req, res) => {
    const id = req.params.id
    const trainingForm = req.params.tf
    const exercise = await MaterialController.getExerciseInfo(id)
    res.render("Exercise", { exercise: exercise, title: id, trainingForm: trainingForm })
})
app.listen(8080, () => console.info("Server startet on 8080"))