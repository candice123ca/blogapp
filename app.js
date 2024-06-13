const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {blogmodel} = require("./models/blog")
const bcryptjs = require("bcryptjs")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://paul2001:Paul730426@cluster0.mu9iiga.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")


//encryption code
const generateHashedPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(password, salt)
}
//

app.post("/signup", async (req, res) => {
    let input = req.body
    let HashedPassword = await generateHashedPassword(input.password)
    console.log(HashedPassword)
    input.password =HashedPassword//for secure entry into db
    let blog= new blogmodel(input)
    blog.save()
    res.json({ "status": "success" })
}
)

app.listen(8086, () => {
    console.log("server started")
})