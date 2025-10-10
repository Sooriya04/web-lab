const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name : String,
    email : String,
    phno : String,
    empId : String,
    role : String
})

module.exports = mongoose.model('Employee', EmployeeSchema)