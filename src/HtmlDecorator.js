
var util = require('util');
var escapeStringRegexp = require('escape-string-regexp');

function HtmlDecorator( opts ) {

  var _opts = {
    ignoreTexts:[]
  };

  util._extend(_opts, opts);

  //for english condition
  this._symbols = ['(', '[?!,.<>　]' , ')'];
  this._opts = _opts;
}

util._extend(HtmlDecorator.prototype, {

  decorate: function(html, keywords, replace) {
    return this._matchAndReplace(html, keywords, replace);
  },

  _isEnglish:function( text ) {
    return /^[\d|a-zA-Z]+$/.test( text );
  },

  _buildSpaceSymbol:function( text ) {
    var result = text.replace(new RegExp(this._symbols.join(''), 'ig'), ' $1 ');
    result = ` ${result} `;
    return result;
  },

  _removeSpaceSymbol:function( text ) {
    var rSymbol = new RegExp(this._symbols.join(' '), 'g');
    return text.replace(rSymbol, function ( compareText ) { return compareText.replace(/ /g, ''); }).trim();
  },

  _splitIgnoringText: function( text ) {
    var ignoreTexts = this._opts.ignoreTexts;
    var ignoreRegExpText = ignoreTexts.length != 0 ? `|${ignoreTexts.join('|')}` : '';
    var splitRegExp = new RegExp(`(<\/?[^>]*>${ignoreRegExpText})`, 'g');
    return text.split(splitRegExp);
  },

  _matchAndReplace:function(html, keywords, replace) {
    var _this = this;
    var text = _this._buildSpaceSymbol( html );
    var compareTexts = _this._splitIgnoringText( text );
    var existKeywordTexts = '';
    var matches = [];

    keywords.forEach(function( keyword ){

      var separated = _this._isEnglish( keyword ) ? ' ' : '';
      var matchWholeKeyword = `${separated}${keyword}${separated}`;

      if ( keyword && text != keyword && existKeywordTexts.indexOf(matchWholeKeyword) == -1 ) {
        var rWord = new RegExp(`${separated}${escapeStringRegexp(keyword.replace(/\./g, ' \. '))}${separated}`, 'ig');

        compareTexts = compareTexts.map(function(compareText, index){
          if (index % 2 === 0 && compareText) {
            var start = compareText.search(rWord);

            if (start > -1) {
              compareText = compareText.replace(rWord, function(matchText, startIndex, completeText){
                var rRemoveSpaceBetweenDotAndEN = /([a-z]+) +(\.) ?/ig;
                var result = matchText.trim().replace(rRemoveSpaceBetweenDotAndEN, '$1$2');
                return `${separated}${replace(result,{hit:keyword})}${separated}`;
              });
              matches.push(keyword);
              existKeywordTexts += matchWholeKeyword;
            }

          }

          return compareText;
        });
      }

    });

    var combineText = compareTexts.join('');
    return {text:_this._removeSpaceSymbol(combineText), matches:matches};
  }

});

module.exports = HtmlDecorator;

