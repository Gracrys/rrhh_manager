var e = require('express')();
var mysql = require('mysql');
const Vue = require('vue')
// const server = e();
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser')
const db =  require("./server/db_config")
// var session = require('express-session');
 const fs = require('fs');
//

var multer  = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/docs/')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname )

        return file.originalname 
    }
})

var upload = multer({storage})

e.use(cors({
    origin: true,
    credentials: true }));

e.use(bodyParser.urlencoded({ extended: false }));
e.use(bodyParser.json());
e.use(require('cookie-parser')("Cheeta"));
// e.use(formidable());
// e.use(e.cookieParser());
//entry point for server
//database connection
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
    var sql = "";
// sql = "INSERT INTO users (username,employee_id, pass, secret_key, user_type) VALUES ('admin', 1, 123456, 'moody toxicroak', 1)";
  /*db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("0 record inserted");
  }); */
});

e.post('/auth', 
  function(req,res){

      const {user, pass} = req.body
  if( user ){
      sql = `select * from users where username = '${user}' AND pass = ${pass}`;
      db.query(sql, function (err, result) {
          if (err) throw err;
          if(result !== []){
              res.cookie("secretSessionValidator",result[0]['secret_key'])
              res.cookie("cookie",result[0]['id'])
              console.log(result[0])
              res.json({'auth': true, user: result[0]});
          }
      }); 
    }
});

e.post('/user/get', 
  function(req,res){

      sql = `select * from users where id = ${req.body.id}`;
      db.query(sql, function (err, result) {
          if (err) throw err;
          if(result !== []){
            res.json({ user: result[0]});
          }else res.sendStatus(201)
      }); 
});


e.use(function(req, res, next) {
    if (!req.cookies.secretSessionValidator) return res.sendStatus(401)
    next()
})



e.get('/rrhh_api', 
  function(req,res){

       res.json({hey: "listen"});
  });

e.post('/rrhh_api/users/new', 
  function(req,res){

 
});

e.post('/rrhh_api/users/all', 
  function(req,res){

  sql = `select * from users where inactive = 0 or user_type != 0`;
  db.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result)
  }); 

});

let pump = require('pump')

const drainStream = stream =>
    new Promise((resolve, reject) => {  let dataParts = [Buffer.alloc(0)] 
        // this is so Buffer.concat doesn’t error if nothing comes;
        stream.on('data', d=>dataParts.push(d));
        stream.on('error', reject);
        stream.on('close', ()=> {
            resolve(Buffer.concat(dataParts)); console.log("until here")
        });
    });
/*e.post('/rrhh_api/proyects/new', multer.single("doc") ,function(req,res){
console.log(req.file)
*/
e.post('/rrhh_api/proyects/new',  function(req,res){

    let {id, denominacion, description ,start_date, finish_date, status, employees, promotor} = req.body
    const docs = __dirname + "/public/files"

    sql = `INSERT INTO proyects (keyname,denominacion, start_date, finish_date,status, employees_id, promotor_id, description) VALUES ('${id}', '${denominacion}', '${start_date}', '${finish_date}', '${status}', '${employees ? employees : ""}', '${promotor ? promotor : ""}', '${description ? description : ""}')`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.send("1 proyect added")
    });
    console.log('body: ' + JSON.stringify(req.body));


});


e.post('/rrhh_api/proyects/nex', upload.single("doc") ,function(req,res){
console.log(req.file)
    let {id, denominacion, start_date, finish_date, status, employees, promotor} = req.body
    const docs = __dirname + "/public/files"

    sql = `INSERT INTO proyects (keyname,denominacion, start_date, finish_date,status, employees_id, promotor_id) VALUES ('${id}', '${denominacion}', '${start_date}', '${finish_date}', '${status}', '${employees}', '${promotor}')`;
  /*db.query(sql, function (err, result) {
    if (err) throw err;
      res.send("1 proyect added")
  });*/
 console.log('body: ' + JSON.stringify(req.body));


});



e.post('/rrhh_api/employees/new', function(req,res){
    let {CI, name, last_name, address, telephone, email, initial_date, speciality} = req.body

    sql = `INSERT INTO employee (CI,name, lastname, address,telephone, email, initial_date, speciality) VALUES (${CI}, '${name}', '${last_name}', '${address}', '${telephone}', '${email}', '${initial_date}', '${speciality}')`;
  db.query(sql, function (err, result) {
    if (err) throw err;
      res.send("1 employee added")
  }); 
})

e.post('/rrhh_api/users/new', function(req,res){
    let { username, pass, secret_key, user_type, employees_id, inactive} = req.body

    sql = `INSERT INTO users (username, pass, secret_key, user_type, employees_id, inactive) VALUES ( '${username}', '${pass ? pass : 123456}', '${secret_key}', '${user_type}', ${employees_id? employees_id : 0}, '${inactive ? inactive : false}')`;
  db.query(sql, function (err, result) {
    if (err) throw err;
      res.send("1 users added")
  }); 
})

e.post('/rrhh_api/task/new', function(req,res){

    let date = new Date()

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
    var actualDate = "";
        if(month < 10){
          actualDate = (`${year}-0${month}-${day}`)
        }else{
           actualDate = (`${year}-${month}-${day}`)
        }
    let {due_date, title, proyect, description, asignee, status} = req.body

    sql = `INSERT INTO tasks (created_at, due_date, title, proyect, description, asignee, status) VALUES ('${actualDate}','${due_date}', '${title ? title : " "}', '${proyect}', '${description ? description : " " }', '${asignee ? asignee : ""}', ${status})`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.send("one task added")
    }); 
})

e.post('/rrhh_api/docs/new', upload.single("doc") ,function(req,res){
console.log(req.file)
    let {taskDescription , description} = req.body
    
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    var actualDate = "";

    if(month < 10){
      actualDate = (`${year}-0${month}-${day}`)
    }else{
       actualDate = (`${year}-${month}-${day}`)
    }

    const docs = __dirname + "/public/files"

sqllookthru = "select id from tasks where description = '"+ taskDescription +"';"
  db.query(sqllookthru, function (err, result) {
    if (err) throw err;
      console.log("hey man", sqllookthru ,result[0].id)

    sql = `INSERT INTO docs (creation_date, type, task, file, description ) VALUES ('${actualDate}', '${req.file.mimetype}', ${result[0].id}, '${req.file.filename}', '${description}');`;
         db.query(sql, function(err, resx){
      console.log(resx, ">>", err)
      console.log(sql)
      res.send("1 doc added")
        })
  });

});


e.post('/rrhh_api/employees/update', function(req,res){

    let rows = "";

Object.keys(req.body).forEach((x, i, l) => {
    if(x != "id"){
            
        if(i == l.length - 1)
            rows += `${x} = '${req.body[x]}'`
        else
            rows += `${x} = '${req.body[x]}' , `
    } 


})
console.log(req.body)

    sql = `UPDATE employees SET ${rows} WHERE id = ${req.body.id};`

console.log(sql)
  db.query(sql, function (err, result) {
    if (err) throw err;
      res.send("1 proyect updated")
  }); 

})

e.post('/rrhh_api/proyects/update', function(req,res){

    let rows = "";
    console.log(req.body)
Object.keys(req.body.update).forEach((x, i, l) => {
    if(x != "keyname"){
           console.log(l) 
        if(i == l.length - 1)
            rows += `${x} = '${req.body.update[x]}'`
        else
            rows += `${x} = '${req.body.update[x]}' , `
    } 
})

    sql = `UPDATE proyects SET ${rows} WHERE keyname = '${req.body.keyname}';`

console.log(sql)

  db.query(sql, function (err, result) {
    if (err) throw err;
      res.send("1 proyect updated")
  }); 

})
e.post('/rrhh_api/tasks/update', function(req,res){

    let rows = "";

Object.keys(req.body.update).forEach((x, i, l) => {
    if(x != "id"){
            
        if(i == l.length - 1)
            rows += `${x} = '${req.body.update[x]}'`
        else
            rows += `${x} = '${req.body.update[x]}' , `
    } 

})
    sql = `UPDATE tasks SET ${rows} WHERE id = ${req.body.id};`

  db.query(sql, function (err, result) {
    if (err) throw err;
      res.send("1 task updated")
  }); 
})

e.post('/rrhh_api/docs/update', function(req,res){

    let rows = "";

Object.keys(req.body.update).forEach((x, i, l) => {
    if(x != "id"){
            
        if(i == l.length - 1)
            rows += `${x} = '${req.body.update[x]}'`
        else
            rows += `${x} = '${req.body.update[x]}' , `
    } 

})
    sql = `UPDATE tasks SET ${rows} WHERE id = ${req.body.id};`

  db.query(sql, function (err, result) {
    if (err) throw err;
      res.send("1 task updated")
  }); 

let {task , description} = req.body
    
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    var actualDate = "";

    if(month < 10){
      actualDate = (`${year}-0${month}-${day}`)
    }else{
       actualDate = (`${year}-${month}-${day}`)
    }



    sql = `INSERT INTO docs (creation_date, type, task, file, description ) VALUES ('${actualDate}', '${req.file.mimetype}', ${task}, '${req.file.filename}', '${description}');`;

    db.query(sql, function(err, resx){
        console.log(resx, ">>", err)
        console.log(sql)
        res.send("1 doc added")
    })

})

e.post('/rrhh_api/employees/all', function(req,res){

    sql = `select * from employee`;
  db.query(sql, function (err, result) {
    if (err) throw err;
      res.json(result)
  }); 
})

e.post('/rrhh_api/projects/all', function(req,res){

    sql = `select * from proyects`;
  db.query(sql, function (err, result) {
    if (err) throw err;
      res.json(result)
  }); 
})
 
e.post('/rrhh_api/tasks/all', function(req,res){
        console.log(req.body)
        const {id} = req.body
    sql = `select * from tasks where proyect = '${id ? id : 0 }'`;
  db.query(sql, function (err, result) {
    if (err) throw err;
      res.json(result)
  }); 
})

e.post('/rrhh_api/docs/all', function(req,res){
        console.log(req.body)
        const {id} = req.body
    sql = `select * from docs where task = '${id ? id : 0 }' ORDER BY id desc;`;
  db.query(sql, function (err, result) {
    if (err) throw err;
      res.json(result)
  }); 
})


 
e.post('/rrhh_api/projects/id', function(req,res){
        console.log(req.body)
        const {id} = req.body
const         regexp = new RegExp('((?<!\\d)'+ id +'(?!\\d))', 'gm')
     sql = `select * from proyects where employees_id like '%${id ? id : 0}%' OR promotor_id = ${id ? id: 0}`;
    console.log(sql)
  db.query(sql, function (err, result) {
    if (err) throw err;
      res.json(result.filter(x => x.employees_id.match(regexp)))
  }); 
})


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


e.listen(8081, "localhost", () => console.log("going through the server wooooo!!"));
