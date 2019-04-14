var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/weekcalendar');

var userSchema = new mongoose.Schema({
    user: String,
    passwd: String
},{collection: 'usercollection'});

var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String
},{collection: 'employeercollection'});

module.exports = {Mongoose: mongoose , UserSchema: userSchema, EmployeeSchema: employeeSchema};