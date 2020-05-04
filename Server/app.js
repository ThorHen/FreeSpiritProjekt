const express = require("express")
const app = express()
const dbController = require("../Controllers/dbController")

app.set("view engine", "pug")
//app.set("views", "/Server/Views")
app.use(express.static("Server"))


app.get("/Admin", async (req, res) => {
    users = await dbController.getUserNames()
    res.render(__dirname + "/Views/AdminPage", { users: users })
})
app.listen(8080, () => console.info("Server startet on 8080"))