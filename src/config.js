var sql = require('mssql');

//var user="Athletes"; 
//var password='abcd123A';


let dbConnect = (user, password)=>{
  return new sql.ConnectionPool(
    config = {
    user: user,
    password: password,
    server: 'localhost\\SQLEXPRESS', 
    database: 'SportsOrganizations',
    options: {
      truestedConnection: true,
      instancename: 'SQLEXPRESS'
    }
  }).connect();
}

module.exports = dbConnect;
