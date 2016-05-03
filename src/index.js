
var HtmlDecorator = require('./HtmlDecorator');

exports.decorate = function(html, keywords, replace, opts) {

  var htmlDecorator = new HtmlDecorator( opts || {} );
  return htmlDecorator.decorate(html, keywords, replace);
};

