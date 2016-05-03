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

Follow this if you need ignore some texts.

```js
var result = textDecorator.decorate('這是一個裝飾者，不是飾者。', ['飾者'], decorateBold, {ignoreTexts:['裝飾者']});

//print '這是一個裝飾者，不是**飾者**。'
console.log(result.text);
```

## Test

```sh
npm run test
```

