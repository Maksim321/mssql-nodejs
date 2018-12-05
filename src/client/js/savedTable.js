function SavedTable(savedTable){
  let table = savedTable;

  this.getTable = ()=> {
    return table;
  }

  this.getArrKeys = ()=> {
    return Object.keys(table[0]);
  }

  this.getArrValues = (index)=> {
    return Object.values(table[index]);
  }

}
		



