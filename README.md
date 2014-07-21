# MathLib
[Homepage](http://mathlib.de/en/) - [Download](http://mathlib.de/en/download) - [Demonstrations](http://mathlib.de/en/demos) - [Documentation](http://mathlib.de/en/docs)

[![Build Status](https://travis-ci.org/alawatthe/MathLib.svg?branch=master)](https://travis-ci.org/alawatthe/MathLib) [![Dependency Status](https://david-dm.org/alawatthe/MathLib.svg)](https://david-dm.org/alawatthe/MathLib) [![devDependency Status](https://david-dm.org/alawatthe/MathLib/dev-status.svg)](https://david-dm.org/alawatthe/MathLib#info=devDependencies) [![NPM version](https://badge.fury.io/js/mathlib.svg)](http://badge.fury.io/js/mathlib) [![Coverage Status](https://img.shields.io/coveralls/alawatthe/MathLib.svg)](https://coveralls.io/r/alawatthe/MathLib?branch=master)

MathLib.js is a JavaScript library for mathematical computations. It can handle circles, complex numbers, expressions, functions, lines, integers, matrices, permutations, points, polynomials, rational numbers, sets, and vectors.

There is a SVG and Canvas renderer for 2D plotting. 3D plotting is supported with [Three.js](https://github.com/mrdoob/three.js).

Further it can parse Content MathML and write Content MathML, Presentation MathML and LaTeX.


## Test Suite
MathLib has an extensive QUnit test suite with more than 2500 tests. Crossbrowser tests are automated with Sauce Labs' Open Sauce and are run by Travis on every commit.


## Getting Started

### In the browser
Download the [production version](https://raw.github.com/alawatthe/MathLib/master/build/MathLib.min.js) or the [development version](https://raw.github.com/alawatthe/MathLib/master/build/MathLib.js).

Alternatively you can use Bower:
```
bower install MathLib
```

or npm:
```
npm install MathLib
```

Include MathLib in your web page:

```
<script src="path/to/MathLib.min.js"></script>
<script>
// Your code goes here
</script>
```

Alternatively you can use the AMD, CommonJS or ES6 modules contained in the _build_ directory.

If you want to use the plotting functionality you also need to download the [MathLib.css](https://raw.github.com/alawatthe/MathLib/master/build/MathLib.css) or the [MathLib.min.css](https://raw.github.com/alawatthe/MathLib/master/build/MathLib.min.css) file and link to it in the head of your document:
```
<link rel="stylesheet" href="path/to/MathLib.min.css" charset="utf-8">
```


## Contributing

### Building MathLib

Open your Terminal, clone MathLib

```
git clone git://github.com/alawatthe/MathLib.git
```

Enter the directory
```
cd MathLib
```

and run
```
npm install
```
to install the development dependencies (For this you need to have [Node.js](http://nodejs.org) installed).


Run
```
grunt help
```
to get an overview of the available grunt tasks.


### Making Changes

Make your changes to the files in the _src_ directory. Do not edit the files in the _build_ directory, these files will be generated via grunt.

Please maintain the current coding style and stick to the [style guide](http://mathlib.de/en/meta/styleguide).
New functionality should always be added with proper testing and documentation.


## Release History
* v0.7.0: AMD, CommonJS, ES6 modules
* v0.6.0: Conics module
* v0.5.0: removed MathML module and improved Expression module
* v0.4.0: Typescript, better plotting
* v0.3.0: grunt integration
* v0.2.0: Improved function and MathML modules
* v0.1.0: Initial release


## License
Copyright (c) 2012-2014 Alexander Zeilmann  
Licensed under the MIT license.
