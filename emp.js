const bodyParser = require('body-parser');
var express = require('express')
var app = express()
let mysql = require('mysql');
let config = require('./config.js');

app.get('/',function(req,res) {
    res.json("Hi welcome")
})

app.get('/getEmpList', function(req,res) {

   let connection = mysql.createConnection(config);
   let sql = `SELECT * FROM vishesh.employees`;
   connection.query(sql, (error, results, fields) => {
       if (error) {
         res.json("1");
         return console.error(error.message);
       }
       else if(results.length>0)
       {
         console.log(results);
         res.json(results)
       }
       else
       {
         res.json("2");
       }
   });
   connection.end();
})

//emp_id, first_name, last_name, email, phone_num, address, gender, designation

app.get('/addEmp', function(req,res) {
    
    let todo = [req.query.emp_id,req.query.first_name,req.query.last_name,req.query.email,req.query.phone_num,req.query.address,req.query.gender,req.query.designation];
    
    let connection = mysql.createConnection(config);
  
    let stmt = `Insert into vishesh.employees(emp_id, first_name, last_name, email, phone_num, address, gender, designation)
                values(?,?,?,?,?,?,?,?)`;
  
    connection.query(stmt, todo, (err, results, fields) => {
      if (err) {
        res.json("You entered duplicate Employee Id");
        return console.error(err.message);
        
      }
      res.json('Details are submitted')
    });
    connection.end();
});


app.get('/deleteEmp', function(req,res) {
  let connection = mysql.createConnection(config);
  let sam = `delete from vishesh.employees where emp_id=` + req.query.emp_id;
  connection.query(sam, (error, results, fields) => {
    if (error) {
      res.json("0");
      return console.error(error.message);
    }
    else if(results.affectedRows>0)
    {
      console.log(results);
      res.json("1")
    }
    else
    {
      res.json("2");
      console.log(results);
    }
});
connection.end();
})


app.get('/checkEmp', function(req,res) {
  
  let connection = mysql.createConnection(config);
  let sam = `select * from vishesh.employees where emp_id=` + req.query.emp_id;
  connection.query(sam, (error, results, fields) => {
    if (error || req.query.emp_id=="null"){
      res.json("0")
      return console.error(error.message);
    }
    else if(results.length>0)
    {
      res.json(results);
      console.log("Employee id is there");
    }
    else
    {
      res.json("1");
    }
  });
  connection.end();
})


app.get('/updateEmp', function(req,res) {

  let connection = mysql.createConnection(config);
  let sql = 'UPDATE vishesh.employees SET first_name= "' + req.query.first_name + '" WHERE emp_id = ' + req.query.emp_id + ';';
  connection.query(sql, (error, results, fields) => {
    if (error){
        return console.error(error.message);
     }
     console.log('Rows affected:', results.affectedRows);
  });
  connection.end();
}) 


app.get('/update', (req, res)=>{ 
  let connection=mysql.createConnection(config)
  connection.connect(function(err) {
    if (err) {
       return console.error('error: ' + err.message);
    }
 
    console.log('Connected to the MySQL server.');
    let stmt = ' UPDATE vishesh.employees SET first_name = "'+req.query.first_name+'",last_name="'+req.query.last_name +'",email="'+req.query.email+'",phone_num="'+req.query.phone_num+'",address="'+req.query.address+'",gender="'+req.query.gender+'",designation="'+req.query.designation +'" WHERE emp_id='+req.query.emp_id+';';
    connection.query(stmt, (error, results, fields) => {
        if (error||req.query.emp_id==null) {
          res.json("0");
          return console.error(error.message);
        }
        else if(results.length>0)
        {
          console.log(results);
          res.json(results)
        }
        else 
        {
          res.json("1");
        }
    });
    connection.end(); 
  });
});


var moment = require('moment');
app.get('/attend', function(req,res) {
  
  today = moment().format('YYYY-MM-DD');
 // today.format('dd-m-yy');
  let todo = [req.query.emp_id,today,req.query.val];
  let connection = mysql.createConnection(config);
  let sam = `Insert into vishesh.attendence(emp_id, date, attend)values(?,?,?)`;
  connection.query(sam,todo, (error, results, fields) => {
    if (error){
      res.json("There is a error in your query")
      return console.error(error.message);
    }
    else if(results)
    {
      res.json(results);
      console.log("Employee id is there");
    }
    else
    {
      res.json("1");
    }
  });
  connection.end();
})

app.listen(3000)