# Mk

Make in node.js

## Installation

```bash
npm i -g @gzzhanghao/mk
```

## Usage

Write a Makefile.js:

```javascript
// Makefile.js

exports.build = function(args) {
  return new Promise((resolve, reject) => {
    // do some stuff
  })
}
```

Then run it with mk:

```bash
mk build
```

You can specify babel options with babelrc:

```javascript
{
  plugins: [
    'transform-async-to-generator',
    'transform-es2015-modules-commonjs',
  ],
}
```

Then you can write your Makefile with babel:

```javascript
export async function build(args) {
  // do some stuff...
}
```

## Use with x

Mk works great with [x module](https://github.com/gzzhanghao/x)

```javascript
import x from '@gzzhanghao/x'

export async function build(args) {
  await x(`
    rm -rf tmp dest && mkdir dest
    babel src -d tmp
    browserify tmp/index.js -o dest/bundle.js
  `)
  await x([
    'rm -rf tmp',
    'uglifyjs --compress --mangle -- dest/index.js > dest/bundle.min.js',
  ])
}
```
