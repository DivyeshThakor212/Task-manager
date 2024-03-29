const express = require("express")
const port = 5000
const dotenv = require("dotenv")
dotenv.config()
const app = express()
app.use(express.json())
const cors = require('cors')
const {db} = require("./config/db")
const user = require("./routes/route")
const task = require("./routes/task.route")
const comment = require("./routes/comments.route")


corsoption = {
    origin:['*'],
    credential: true,
}

app.use(cors(corsoption))
// app.use("/api/v1/user",user)
app.use("/api/v1",user)
app.use("/api/v1",task)
app.use("/api/v1",comment)



app.listen(port,() =>{
    console.log(`server is listening on ${port}`)
    db()
} )