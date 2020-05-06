const express = require("express")
const app = express()
const dbController = require("../Controllers/dbController")

app.set("view engine", "pug")
//app.set("views", "/Server/Views")
app.use(express.static("Server"))


app.get("/Admin", async (req, res) => {
    const users = await dbController.getUserNames()
    res.render(__dirname + "/Views/AdminPage", { users: users })
})

app.get("/Traeningsformer", async (req, res) => {
    const trainingforms = await dbController.getAllTrainingForms()
    res.render(__dirname + "/Views/TrainingForms", { trainingforms: trainingforms })
})

app.get("/Oevelser/:id", async (req, res) => {
    const id = req.params.id
    const exercises = await dbController.getTrainingExercises(id)
    res.render(__dirname + "/Views/Exercises", { exercises, exercises })
})
app.get("/Oevelser/:id/:tag", async (req, res) => {
    const id = req.params.id
    const tag = req.params.tag
    const exercises = await dbController.getExercisesByTag(id,tag)
})

app.get("/Oevelse/:id", async (req, res) => {
    const id = req.params.id
    console.log(id);

    const exercise = await dbController.getExerciseInfo(id)
    res.render(__dirname + "/Views/Exercise", { exercise, exercise })
})
app.listen(8080, () => console.info("Server startet on 8080"))