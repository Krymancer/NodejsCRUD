var express = require('express');
var router = express.Router();
var loged = false;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(loged){
    var db = require("../db");
    var Employees = db.Mongoose.model('employeecollection', db.EmployeeSchema, 'employeecollection');
    Employees.find({}).lean().exec((err, results) => {
      if (err) return console.log(err)
      res.render('index', {page:'Home', menuId:'home', data: results })
      //console.log(results);
    });
    //res.render('index', {page:'Home', menuId:'home'});
  }else{
    res.render('login', {page:'Login', menuId: 'login'} )
  }
});

/* POST home Service */
router.post('/',function(req,res){
  console.log(req.body);

  var db = require("../db");
  var name = req.body.name;
  var email = req.body.email;
  var address = req.body.address;
  var phone = req.body.phone;

  var Employees = db.Mongoose.model('employeecollection', db.EmployeeSchema, 'employeecollection');
  var employee = new Employees({ name: name, email: email, address: address, phone: phone });
  employee.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
          res.redirect("/");
      }
  });
});

/* POST home edit Service */
router.post('/edit',function(req,res){
  console.log(req.body);
  var id = req.body.id;
  var name = req.body.name;
  var email = req.body.email;
  var address = req.body.address;
  var phone = req.body.phone;

  var edit = {
    $set: {     
      name: name,
      email: email,
      address: address,
      phone: phone
    }
  };
  var db = require("../db");
  var Employees = db.Mongoose.model('employeecollection', db.EmployeeSchema, 'employeecollection');
  Employees.updateOne({_id: id},edit,function(err,res){
    if(err) return console.log(err);
    console.log("UPDATED");
  });

  res.redirect("/");
});

/* POST home delete Service */
router.post('/delete',function(req,res){
  console.log(req.body);
  var id = req.body.id;

  var db = require("../db");
  var Employees = db.Mongoose.model('employeecollection', db.EmployeeSchema, 'employeecollection');
  Employees.deleteOne({_id: id},function(err,res){
    if(err) return console.log(err);
    console.log("DELETED");
  });
  res.redirect("/");
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.find({}).lean().exec(
     function (e, docs) {
        res.render('userlist', { "userlist": docs });
  });
});

/* GET New User page. */
router.get('/adduser', function(req, res) {
res.render('adduser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
 
    var db = require("../db");
    var user = req.body.user;
    var userpasswd = req.body.password;
 
    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    var user = new Users({ user: user, passwd: userpasswd });
    user.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("userlist");
        }
    });
});

/* GET Login page. */
router.get('/login', function(req, res) {
  res.render('login', { page: 'Login', menuId:'login'});
});

/* POST to Login Service */
router.post('/login', function (req, res) {
 
  var db = require("../db");
  var user = req.body.user;
  var userpasswd = req.body.password;

  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.findOne({user: user, passwd: userpasswd},function(err,user){
    if(err){
      console.log(err);
    }

    if(!user){
      return res.status(404).send();
    }
    loged = true;
    return res.redirect("/");
  });
});

module.exports = router;