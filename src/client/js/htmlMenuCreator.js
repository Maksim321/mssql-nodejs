function HtmlMenuCreator(menuClass){
  this._menuClass = menuClass;
  this._liContainer = '';
}

HtmlMenuCreator.prototype.getHtmlMenu = function() {
  return `<ul class = ${this._menuClass}>${this._liContainer}</ul>`;
};

HtmlMenuCreator.prototype.clearMenu = function() {
  this._liContainer = '';
};

HtmlMenuCreator.prototype.getHtml_li = function(className, content) {
  return `<li class = ${className}>${content}</li>`;
};

HtmlMenuCreator.prototype.getHtml_a = function(id, content) {
  return `<a id = ${id}>${content}</a>`;
};

HtmlMenuCreator.prototype.addRow = function(className, content) {
  this._liContainer += this.getHtml_li(className, content);
};
