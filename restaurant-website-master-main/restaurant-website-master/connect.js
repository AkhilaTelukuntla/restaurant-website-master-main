const express = require('express');
const path=require('path');
const bodyParser = require('body-parser');
const app = express();
var mysql = require('mysql2');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
//app.use('/img',express.static('img'));
app.use(express.static('public'));

const connection = mysql.createConnection({ 
  host: 'localhost', 
  user: 'root',
  password: 'Akhi@041', 
  database: 'qadbhoney' ,
  port:3306
});


app.get('/', function(req,res){
 // res.sendFile(path.join(__dirname,'/contact.html'));
 res.sendFile(__dirname+"/"+"index.html");
});

// app.get('/', function(req,res){
//   // res.sendFile(path.join(__dirname,'/contact.html'));
//   res.sendFile(__dirname+"/"+"index.css");
//  });

app.post('/submitaction', (req, res) => {
// console.log(req.body);
var uname=req.body.eusername;
var upswd=req.body.epassword;
//res.write('your username'+req.body.username+"\n");
//res.write('your password'+req.body.password+"\n");


connection.connect(function(err) {
  if (err) throw err;
  var sql="INSERT INTO EMployee (LastName,PersonID) VALUES('"+uname+"','"+upswd+"')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted successfully");
    res.end();
  });
});


});

/*app.post('/submit', function(req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  var name=req.body.username;
var pswd=req.body.password;
  connection.connect(function(err) {
if (err) throw  err;
console.log("connected");
var sql = "INSERT INTO person(LastName,PersonID) VALUES ('"+name+"','"+pswd+"')";
connection.query(sql, function(err, result)  {
 if(err) throw err;
 console.log("Record inserted succesfully");
});
});

res.render('index', { title: 'Express' });
});
*/

//module.exports = router;

const port = 3003;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});
