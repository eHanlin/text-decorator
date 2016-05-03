text-decorator
=======================================================

The project is able to help to modify texts.

## Install

```sh
npm install text-decorator
```

## Usage

```js
var textDecorator = require('text-decorator');

var decorateBold = function( text ) { 
  return `**${text}**`;
};

var result = textDecorator.decorate('This is a dog.', ['dog'], decorateBold);

//print 'This is a **dog**.'
console.log(result.text);

//print ['dog']
console.log(result.matches);
```

Follow this if you need ignore some words.

```js
var result = textDecorator.decorate('這是一個裝飾者，不是飾者。', ['飾者'], decorateBold, {ignoreTexts:['裝飾者']});

//print '這是一個裝飾者，不是**飾者**。'
console.log(result.text);
```

## API

#### textDecorator.decorate(text, keywords, replace)

To match keywords then replace.

| name              | type    | required |description                                            |
|-------------------|---------|--------- |-------------------------------------------------------|
|text               |string   |    *     |The text will be replaced.                             |
|keywords           |string[] |    *     |The keywords will be matched.                          |
|replace            |fn       |    *     |To replace text content by matched.                    |
|opts               |object   |          |This is optional value.                                |
|opts.ignoreTexts   |string[] |          |To ignore some words for mapping                       |

## Test

```sh
npm run test
```

