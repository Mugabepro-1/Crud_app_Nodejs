const express = require('express')
const app  = express()

//creating routes

app.get('/',(req,res) =>{
    res.send("HELLO NODE APIS")
})

app.listen(3000, ()=>{
    console.log("The app is running on port 3000 ")
})