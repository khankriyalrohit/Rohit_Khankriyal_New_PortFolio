const app = require("./app.js")
const dotenv = require('dotenv')

// connecting database
const connectDatabase = require("./config/database")


//path 
dotenv.config({path : "./config/config.env"})


connectDatabase()


const server = app.listen(process.env.PORT,()=>{
    console.log(`The server is running on http://localhost:${process.env.PORT}`);
})

