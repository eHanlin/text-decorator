
var assert = require('assert');
var textDecorator = require('../src/index');

var decorateBold = function( text ) {
  return `**${text}**`;
};

describe('textDecorator', function(){
  describe('#decorate(html, keywords, replace)', function(){

    it('should return true when value is matched', function(){
      var result = textDecorator.decorate('This is a dog.', ['dog'], decorateBold);

      assert.equal(true, result.text === 'This is a **dog**.');
      assert.equal(true, result.matches.indexOf('dog') > -1);
    });

    it('should return true when value is matched by words', function(){
      var result = textDecorator.decorate('The Airwaves is cool.The ice is also cool.', ['airwaves', 'cool'], decorateBold);

      assert.equal(true, result.text === 'The **Airwaves** is **cool**.The ice is also **cool**.');
      assert.equal(true, result.matches.length === 2);
    });

    it('should return true when value is matched by max length word', function(){
      var result = textDecorator.decorate('This is a [decorator].', ['decorator', '[decorator]'], decorateBold);

      assert.equal(true, result.text === 'This is a **[decorator]**.');
      assert.equal(true, result.matches.length === 1);
    });

    it('should return true when value is matched by inner content', function(){
      var result = textDecorator.decorate('這是一個裝飾者。', ['裝飾者'], decorateBold);

      assert.equal(true, result.text === '這是一個**裝飾者**。');
      assert.equal(true, result.matches.length === 1);
    });

    it('should return true when opts use a `ignoreTexts` parameter', function(){
      var result = textDecorator.decorate('這是一個裝飾者，不是飾者。', ['飾者'], decorateBold, {ignoreTexts:['裝飾者']});

      assert.equal(true, result.text === '這是一個裝飾者，不是**飾者**。');
      assert.equal(true, result.matches.length === 1);
    });

    it('should return true when a word of English is beside tag', function() {
      var result = textDecorator.decorate('<p>This is a dog</p>', ['this', 'dog'], decorateBold);
      assert.equal(true, result.text === '<p>**This** is a **dog**</p>');
    });

    it('should return true when a word of English contains other words', function() {
      var result = textDecorator.decorate('<p>The telephone is ______.  They are on the table in the living room.</p>', ['the', 'table', 'telephone', 'living room', 'on'], decorateBold);
      assert.equal(true, result.text === '<p>**The** **telephone** is ______.  They are **on** **the** **table** in **the** **living room**.</p>');
    });

    it('should return true when a word of Chinese contains other words', function() {
      var result = textDecorator.decorate('這是一個裝飾者。', ['裝飾者', '裝飾'], decorateBold);
      assert.equal(true, result.text === '這是一個**裝飾者**。');
    });

	it('should return true when words have space of full width', function() {
      var result = textDecorator.decorate('<p>table　</p>', ['table'], decorateBold);
      assert.equal(true, result.text === '<p>**table**　</p>');
	});

	it('should return true when is English phrase', function() {
      var result = textDecorator.decorate('<p>I take a walk every day</p>', ['take a walk', 'take', 'walk'], decorateBold);
      assert.equal(true, result.text === '<p>I **take a walk** every day</p>');
	});

  });
});

