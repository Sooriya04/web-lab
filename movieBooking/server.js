const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

mongoose
.connect('mongodb://localhost:27017/movieBooking')
.then(()=>{
    console.log('db is connect')
})
.catch((err)=>{
    console.error('Error : ' + err)
});

const bookingSchema = new mongoose.Schema({
    movieName: String,
    userName: String,
    email: String,
    seats: Number,
    movieDate: String,
    bookingDate: { type: Date, default: Date.now }
});

const bookingModel = mongoose.model('bookingModel', bookingSchema);

// GET
app.get('/api/booking', async (req, res) => {
    const booking = await bookingModel.find()
    res.json(booking)
})

// POST
app.post('/api/booking', async(req, res)=>{
    const bookingReq = req.body;
    console.log(bookingReq)
    const bookingData = await bookingModel.create(bookingReq);
    res.json(bookingData)
})

// LISTEN
app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})
