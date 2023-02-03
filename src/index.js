const express = require("express")
const mongoose = require("mongooose")
const app = express()
const route = require("./routes/route.js")

app.use(express.json())

mongoose.connect("" , {
    useNewUrlParser : true
})
.then(()=> console.log("mongoDB is Connected"))
.catch((err) =>  console.log(err))

app.use("/" , route)

app.listen(process.env.PORT ||3000 , ()=>{
    console.log( "Listening on port ", process.env.PORT ||3000)
})