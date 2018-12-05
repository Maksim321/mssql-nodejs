var login;
var password;
var api;
let selectedTable;
var selectTr;
let table;
let menu;

let savedTable;

$(document).ready(function(){
  api = new Api();

  $("#btn-login").click(function () {
    login = $("#txt-login").val();
    if (login.trim().length > 0) {
      api.connectToDB(login, $("#txt-password").val())
      .then(result => {
        createMenu(result);
        selectedTable = result.tables[0].name;
        loadTable(result.tables[0].name);
      })
      .then(() => {
        $( ".start-input" ).toggle();
        if($( ".container" ).is(':hidden')){
          $( ".container" ).show("slow");
          $( ".container" ).slideDown("slow");
        }        
      })
      .catch(err => {
      	console.log(err);
      	console.log("ERRR");
        alert(err.responseJSON.message);
      });
    }
    else {
      $('#txt-login').css("border-color", "red");
      setTimeout(()=> {
        $('#txt-login').css("border-color", "#5f84c1"); 
      },2000);
    }
  });

  $("#addButton").click(function () { 
	  api.insertQuery(selectedTable, getObjInsertValues(selectedTable)).then((result)=>{
      console.log(result);
      loadTable(selectedTable);
	  })
    .catch(err => {
      console.log(err);
      alert(err.responseJSON.message);
    });
  });

  $("#DeleteButton").click(function () {
	  api.deleteQuery(selectedTable, getObjDeleteValues()).then((result)=>{
      loadTable(selectedTable);
	  })
    .catch(err => {
      console.log(err);
      alert(err.responseJSON.message);
    });
  });
	
  $("#UpdateButton").click(function () {
    api.updateQuery(selectedTable, `ID_${selectedTable}`, 
      savedTable.getArrValues(selectTr.rowIndex-1)[0], 
      getObjUpdateValues()).then((result)=>{
        loadTable(selectedTable);
    })
    .catch(err => {
      console.log(err);
      alert(err.responseJSON.message);
    });
	});

  $(".tab_container").on('click','tr',function(){
    $(selectTr).css("background-color", "#ffffff");
    $(this).css("background-color", "#DFEBF1");
    selectTr = this;
  });

  $('.menu').on('click', 'li', function(e) {
    $('.menu .active').removeClass('active');
    $(this).addClass('active');
    selectedTable = $(this).html();
    $(selectedTable).fadeIn(400);
    loadTable(selectedTable);
  });

	$(".container").toggle();
});

function loadTable(tableName){
  api.selectQuery(tableName).then((result)=>{
    savedTable = new SavedTable(result);
    selectTr = "";
    $(".table_container").html(createTable(result, "db-table"));
    $(".inputs_container-text").html(createInputs(result));
  });
}
	
function getObjInsertValues() {
  let objIns = {};
  savedTable.getArrKeys().forEach(function (key){
    objIns[key] = $('#'+key).val();
  });
  return objIns;
}

function getObjUpdateValues() {
  let objUpd = {};
  savedTable.getArrKeys().forEach((key, index)=> {
    if($(`#${key}`).val().trim().length>0)
      objUpd[key] = $(`#${key}`).val().trim();
  });
  return objUpd;
}

function getObjDeleteValues() {
  let objDel = {};
  objDel[savedTable.getArrKeys()[0]] = savedTable.getArrValues(selectTr.rowIndex-1)[0];
  return objDel;
}

function createHtmlInput(type, id, value) {
  return `<input type="${type}" id="${id}" placeholder="${id}"/>`
}

function createInputs(data) {
  let textInputHtml = "";
  savedTable.getArrKeys().forEach(function (key){
    textInputHtml += createHtmlInput("text", key, " ");
  });
  return textInputHtml;
}

function createMenu(data){
  menu = new HtmlMenuCreator('menu_container');
  data.tables.forEach((obj)=> {
    menu.addRow('li-wrap', obj.name);
  });
  $(".menu").html(menu.getHtmlMenu());
}

function createTable(data, toHtml) {
  table = new HtmlTableCreator('db-table');
  let tableHeade = "";
  savedTable.getArrKeys().forEach((key)=> {
    tableHeade += table.getStr_th("db-table-head-th", key);
  });

  table.addThead(table.getStr_tr("db-table-head-tr", tableHeade));

  savedTable.getTable().forEach((obj, index)=> {
    let tableRow = "";
    savedTable.getArrKeys().forEach((key)=> {
      tableRow += table.getStr_td("db-table-td", obj[key]);
    });
    table.addRow("db-table-tr-"+index, tableRow);
  });
  return table.getTable();
}
