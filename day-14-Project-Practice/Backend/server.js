require('dotenv').config()
require("./dns")
const { connect } = require('mongoose')
const app = require("./src/app")
const connectDB = require("./src/config/database")
const port = 3000

connectDB()

app.listen(port, ()=>{
    console.log(`SERVER IS LISTENING ON PORT ${port}`)
})