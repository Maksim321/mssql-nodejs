const dbConnect = require('./config');

function DbQuery(){

  let connection;

  this.connectToDb = (login, password)=> {
    connection = dbConnect(login, password);
    return connection;
  }

  this.getConnection = ()=>{
    return connection;
  }

  this.getStrQuerySELECT = (column, table, where)=> { 
    return where ? `SELECT ${column} FROM ${table} WHERE ${where}` : 
	               `SELECT ${column} FROM ${table}`;
  }

  this.getStrQueryDELETE = (table, where)=> { 
    return `DELETE FROM ${table} WHERE ${where}`;
  }

  this.getStrQueryUPDATE = (table, set, where)=> { 
    return `UPDATE ${table} SET ${set} WHERE ${where}`;
  }

  //получить строку параметров
  let keyToString = (obj)=>{
    return Object.keys(obj).join();  	
  }

  //получить строку значений 
  let valueToString = (obj)=>{
    return Object.values(obj).join(`', '`);  	
  }

  let getUpdParam = (obj)=>{
    let valueStr;
    Object.keys(obj).forEach((key, index)=> {
      valueStr ? valueStr += `, ` : valueStr = '';
      valueStr += `${key} = '${Object.values(obj)[index]}'`
    });
    return valueStr;    
  }

  this.querySELECT = (column, table, where)=> { //Запрос к базе
    return connection.then(pool => {
      return pool.query(this.getStrQuerySELECT(column, table, where));
    });
  }

  this.customQuerySELECT = (query)=> {
    return connection.then(pool => {
      return pool.query(query);
    });
  }

  this.queryINSERT = (table, obj)=> {
    return connection.then(pool => {
      return pool.query(`INSERT INTO ${table} (${keyToString(obj)}) VALUES('${valueToString(obj)}')`);
    });
  }

  this.queryDELETE = (table, obj)=> {
    return connection.then(pool => {
      return pool.query(`DELETE FROM ${table} WHERE ${keyToString(obj)} = ${valueToString(obj)}`);
    });
  }

  this.queryUPDATE = (table, obj, key, keyValue)=> {
    return connection.then(pool => {
      return pool.query(`UPDATE ${table} SET ${getUpdParam(obj)} WHERE ${key} = ${keyValue}`);
    });
  }
}

module.exports = DbQuery;
