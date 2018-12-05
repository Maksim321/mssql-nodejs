function Api(){
  function queryToDb(type, urlRoute, dataJson) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: type,
        dataType: "json", 
        data: dataJson,
        url: `/${urlRoute}`,
        contentType: "application/json",
        success: (data)=> {
          resolve(data);
        },
        error: (err)=> {
          reject(err);
        }
      });
    });
  }

  this.connectToDB = (login, password)=>{
    return queryToDb("GET", "connection", {
      login: login, 
      password: password
    });
  }

  this.selectQuery = (tableName)=>{
    return queryToDb("GET", "select", { tableName: tableName });
  }

  this.insertQuery = (table, data)=>{
    return queryToDb("POST", "insert", JSON.stringify({table: table, data: data}));
  }

  this.deleteQuery = (table, data)=>{
    return queryToDb("DELETE", "delete", JSON.stringify({table: table, data: data}));
  }

  this.updateQuery = (table, key, keyValue, data)=>{
    return queryToDb("POST", "update", JSON.stringify({
        table: table,
        key: key, 
        keyValue: keyValue,
        data: data
      }));
  }
}
		



