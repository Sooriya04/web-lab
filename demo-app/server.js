const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const EmployeeSchema = require('./model')

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://localhost:27017/Employee')

// GET 
app.get('/api/emp', async(req, res)=>{
    const data = await EmployeeSchema.find({});
    res.json(data).status(200);
})
// POST 
app.post('/api/emp', async (req, res) => {
    try{
        console.log(req.body);
        const data = await EmployeeSchema
        .create(req.body)
        .then(()=>{
            console.log('inserted')
        });
        res.status(201).json(data)
         
    }catch(err){
        console.log(`Error at posting : ${err.message}`)
    }
})
// PUT 
app.put('/api/emp/:id', async (req, res) => {
    try{
        console.log(req.params.id);
        const data = await EmployeeSchema
        .findByIdAndUpdate(req.params.id, req.body, 
            {new : true, runValidators : true
        });
        res.status(201).json(data);
    }catch(err){
        console.log(`Error at updating : ${err.message}`)
    }
})
// DELETE 
app.delete('/api/emp/:id', async (req, res) => {
    try{
        console.log('route is hit')
        await EmployeeSchema
        .findByIdAndDelete(req.params.id)
        .then(()=>{
            console.log(`${req.params.id} is deleted succussfully`)
        });
    }catch(err){
        console.log(`Error at deleting : ${err.message}`)
    }
})
// LISTEN 
app.listen(3000, ()=>{
    console.log('server is running on http://localhost:3000/')
})