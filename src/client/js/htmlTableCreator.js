function HtmlTableCreator(tableIdName){
  this._tableIdName = tableIdName;
  this._trContainer = '';
}

HtmlTableCreator.prototype.getTable = function() {
  return `<table class = ${this._tableIdName}>${this._trContainer}</table>`;
};

HtmlTableCreator.prototype.clearTable = function() {
  this._trContainer = '';
};

HtmlTableCreator.prototype.getStr_tr = function(className, td) {
  return `<tr class = ${className}>${td}</tr>`;
};

HtmlTableCreator.prototype.getStr_th = function(className, th_content) {
  return `<th class = ${className}>${th_content}</th>`;
};

HtmlTableCreator.prototype.getStr_td = function(className, td_content) {
  return `<td class = ${className}>${td_content}</td>`;
};

HtmlTableCreator.prototype.addRow = function(className_tr, td) {
  this._trContainer += this.getStr_tr(className_tr,td);
};

HtmlTableCreator.prototype.addRowHeader = function(className_th, th_content) {
  this._trContainer += this.getStr_th(className_th,th_content);
};

HtmlTableCreator.prototype.addThead = function(th_content) {
  this._trContainer += `<thead>${th_content}</thead>`;
};
