# MathLib

MathLib.js is a JavaScript library for mathematical computations. It can handle circles, complex numbers, functions, lines, matrices, permutations, points, polynomials, sets, and vectors.

Further it can parse Content MathML and write Content MathML, Presentation MathML and LaTeX.

Please check out the library's homepage at: <http://MathLib.de/en>

**Be aware that MathLib is in an early beta stage.
There are many bugs to find and fix, before MathLib hits version 1.0.**

## Getting Started

### In the browser
Download the [production version](https://raw.github.com/alawatthe/MathLib/master/build/MathLib.min.js) or the [development version](https://raw.github.com/alawatthe/MathLib/master/build/MathLib.js).

In your web page:

```
<script src="path/to/MathLib.min.js"></script>
<script>
// Your code goes here
</script>
```


## Documentation
The documentation isn't ready yet. In the meantime you can browse the [annotated source](http://mathlib.de/en/docs/annotatedSource).


## Demos
Some demos can be found on the [MathLib demo site](http://mathlib.de/en/demos).


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).


### Building MathLib

Open your Terminal, clone MathLib

```
git://github.com/alawatthe/MathLib.git
```

Make your changes to the files in the _src_ directory. Do not edit the files in the _build_ directory, these files will be generated via grunt.

Running ```grunt``` will update the library, the minified version of MathLib and the testing files.
To update the annotated source run ```docco build/MathLib.js```.

You need to have [Node.js](nodejs.org) and [grunt](http://gruntjs.com/) installed. 

## Release History
* v0.3.0: grunt integration
* v0.2.0: Improved function and MathML modules
* v0.1.0: Initial release

## License
Copyright (c) 2012 Alexander Zeilmann  
Licensed under the MIT license.
