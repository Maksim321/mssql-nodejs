var express = require('express');
var sql = require('mssql');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
const dbConnect = require('./src/config');
let DbQuery = require('./src/dbQuery');
let dbQuery = new DbQuery();

app.use(express.static(__dirname + "/src/client"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/connection', function(req, res){
  console.log(`Подключение: ${req.query.login}`);
  dbQuery.connectToDb(req.query.login, req.query.password).then(result => {
  	return dbQuery.querySELECT('*', `sys.Tables`,'');
  })
  .then(data => {
  	res.send({tables: data.recordset, result: "success"});
  })
  .catch(err => {
  	console.log("ERROR");
  	res.status(500).send({
      result:"error",
      message: err.message
    });
  	console.log(err.message);
  });
});

app.get("/select", function (req, res) {
  dbQuery.querySELECT('*', req.query.tableName, '').then((result)=> {
    res.send(result.recordset);
  });
});

app.post('/insert', function(req, res){
  console.log(req.body);
  dbQuery.queryINSERT(req.body.table, req.body.data).then(()=> {
    res.send({result: "success"});
  })
  .catch(err => {
  	console.log("ERROR");
  	res.status(500).send({
      result:"error",
      message: err.message
    });
  	console.log(err.message);
  });
});

app.delete('/delete', function(req, res){
  dbQuery.queryDELETE(req.body.table, req.body.data).then(()=> {
    res.send({result: "success"});
  })
  .catch(err => {
  	console.log("ERROR");
  	res.status(500).send({
      result:"error",
      message: err.message
    });
  	console.log(err.message);
  });    
});

app.post('/update', function(req, res){
  dbQuery.queryUPDATE(req.body.table, req.body.data, req.body.key, req.body.keyValue).then(()=> {
    res.send({result: "success"});
  })
  .catch(err => {
  	console.log("ERROR");
  	res.status(500).send({
      result:"error",
      message: err.message
    });
  	console.log(err.message);
  }); 
});

function querySelect(requestString) { //Запрос к базе
  return dbQuery.getConnection().then(pool => {
    return pool.query(requestString);
  });
}
var server = app.listen(5000, function () {
  console.log('Server is running..');
});
