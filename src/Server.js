var e = require('express')();
var mysql = require('mysql');
const Vue = require('vue')
// const server = e();
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser')
const db =  require("./server/db_config")

// var session = require('express-session');
// const fs = require('fs');
e.use(cors({
    origin: true,
    credentials: true }));

e.use(bodyParser.urlencoded({ extended: false }));
e.use(bodyParser.json());
e.use(require('cookie-parser')("Cheeta"));
// e.use(e.cookieParser());
//entry point for server
//database connection
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
var sql = "INSERT INTO users (username,employee_id, pass, secret_key, user_type) VALUES ('admin', 1, 123456, 'moody toxicroak', 1)";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("0 record inserted");
  });
});

e.post('/auth', 
  function(req,res){

    if(req.get("secretKey") && req.body.user){
        res.cookie("secretSessionValidator",req.get("secretKey"))
           res.json({'auth': true});
    }

  });

e.use(function(req, res, next) {
    if (!req.cookies.secretSessionValidator) return res.sendStatus(401)
    next()
})



e.get('/rrhh_api', 
  function(req,res){

           res.json({hey: "listen"});
  });


e.get('/test',function(req,res){
  res.send(req.cookies)
})

// custom 404 page
e.use(function(req, res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// custom 500 page
e.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});


e.listen(8081);
