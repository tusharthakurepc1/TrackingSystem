const DBConnection = require("./dao/getDBConnection")
const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./routes/api_routes")
const { default: mongoose } = require("mongoose")
const cors = require("cors")

const server = express()

DBConnection()
mongoose.createConnection()

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(cors());
server.use(routes);

server.listen(5500, ()=>{
    console.log(`server listen at portno: ${5500}`);
})
