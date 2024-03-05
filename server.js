const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app  = express()

//To allow our app know reading json files
app.use(express.json())
//To allow upr app know reading the url
app.use(express.urlencoded({extended:false}))

//creating routes
app.get('/',(req, res) =>{
    res.send("HELLO NODE APIS")
});

//create another route
app.get('/blog', (req, res) =>{
    res.send("Hello blog!")
})

//query all the data from the db
app.get('/products', async(req, res)=>{
    try {
           const product = await Product.find({})
           res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//query the data by id
app.get('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
})





//Route to receive the data and save it to the db
app.post('/products', async(req, res) =>{
    try{
           const product =  await Product.create(req.body)
           console.log(product)
           res.status(200).json(product)
    } catch (error){

        res.status(500).json({message:error.message})
    }
})



app.listen(3000, ()=>{
    console.log("The app is running on port 3000 ")
})

//Update the data in the database
app.put('/products', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body)
        if(!Product){
           return res.status(404).json({message:`can not find product with id ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

        
    } catch (error) {
        res.status(500).json({message:error.message})        
    }
})

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params
        const product =  await Product.findByIdAndDelete(id, req.body)
        if(!product){
            return res.status(404).json({message:`canot get product with id ${id}`})
        }
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

})


mongoose.set("strictQuery", false)
mongoose
.connect('mongodb+srv://admin:12345678promesse@firstclu.foa4nut.mongodb.net/Node API?retryWrites=true&w=majority&appName=Firstclu')
.then(()=>{
    console.log("Connected to the database")
}).catch((error)=>{
    console.log(error)
})

