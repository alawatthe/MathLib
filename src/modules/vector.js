// ## Vector
// The vector implementation of MathLib makes calculations with vectors of
// arbitrary size possible. The entries of the vector can be numbers and complex
// numbers.
//
// It is as easy as
// `MathLib.vector([1, 2, 3])`
// to create the following vector:  
//    ⎛ 1 ⎞  
//    ⎜ 2 ⎟  
//    ⎝ 3 ⎠

prototypes.vector = [];
MathLib.vector = function (vector) {
  var arr, res, i;

  if (typeof vector === "string") {
    arr = vector.split(":").map(parseFloat);
    if (arr.length === 2) {
      arr = arr.splice(1, 0, 1);
    }
    vector = [];
    for (i = arr[0]; i <= arr[2]; i += arr[1]) {
      vector.push(i);
    }
  }


  vector[proto] = prototypes.vector;
  Object.defineProperties(vector, {
    dim: {
      value: vector.length
    }
  });
  return vector;
};


// Setting the .constructor property to MathLib.vector
MathLib.extendPrototype('vector', 'constructor', MathLib.vector);

// Setting the .type property to 'vector'
MathLib.extendPrototype('vector', 'type', 'vector');


// ### Vector.prototype.conjugate()
// Calculates the conjugate of a vector
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'conjugate', function () {
  return MathLib.vector(this.map(MathLib.conjugate));
});


// ### Vector.prototype.dyadicProduct()
// Calculates the dyadic product of two vectors.
//
// *@param {vector}*  
// *@returns {boolean}*
MathLib.extendPrototype('vector', 'dyadicProduct', function (v) {
  return MathLib.matrix(this.map(function (x) {
    return v.map(function (y) {
      return MathLib.times(x, y);
    });
  }));
});


// ### Vector.prototype.isEqual()
// Determines if two vectors are equal
//
// *@param {vector}* v The vector to compare  
// *@returns {boolean}*
MathLib.extendPrototype('vector', 'isEqual', function (v) {
  if(this.dim !== v.dim) {
    return false;
  }

  return this.every(function (x, i) {
    return MathLib.isEqual(x, v[i]);
  });
});


// ### Vector.prototype.isZero()
// Determines if the vector is the zero vector.
//
// *@returns {boolean}*
MathLib.extendPrototype('vector', 'isZero', function (v) {
  return this.every(MathLib.isZero);
});


// ### Vector.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'map', function (f) {
  return this.constructor(Array.prototype.map.call(this, f));
});


// ### Vector.prototype.negative()
// Returns the negative vector
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'negative', function () {
  return this.map(MathLib.negative);
});


// ### Vector.prototype.normalize()
// Normalizes the vector to have length one
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'normalize', function () {
  return this.times(1 / this.size);
});


// ### Vector.prototype.scalarproduct()
// Calculates the scalarproduct of two vectors
//
// *@param {vector}*  
// *@returns {number|complex}*
MathLib.extendPrototype('vector', 'scalarproduct', function (v) {
  var res = 0, i, ii;
  for (i = 0, ii = this.length; i < ii; i++) {
    res = MathLib.plus(res, MathLib.times(this[i], v[i]));
  }
  return res;
});


// ### Vector.prototype.size()
// Determines the length of the vector.
// Named size, as length is already used by JavaScript.
//
// *@returns {number}*
MathLib.extendPrototype('vector', 'size', function () {
  return Math.sqrt(this.conjugate().scalarproduct(this));
});


// ### Vector.prototype.times()
// Multiplies the vector by a (complex) number or a matrix.
// The vector is multiplied from left to the matrix. 
// If you want to multiply it from the right use
// matrix.times(vector) instead of vector.times(matrix)
//
// *@param {number|complex|matrix}*  
// *@returns {vector}*
MathLib.extendPrototype('vector', 'times', function (n) {
  var res = [], i, ii;
  if (typeof n === "number" || n.type === "complex") {
    return this.map(function (x) {
      return MathLib.times(x, n);
    });
  }
  if (n.type === "matrix") {
    res = n.toColVectors();
    for (i = 0, ii = res.length; i < ii; i++) {
      res[i] = this.scalarproduct(res[i]);
    }
    return MathLib.vector(res);
  }
});


// ### Vector.prototype.toArray()
// Converts the vector to an Array
//
// *@returns {array}*
MathLib.extendPrototype('vector', 'toArray', function () {
  return this.slice();
});


// ### Vector.prototype.toContentMathML()
// Returns the content MathML representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toContentMathML', function () {
  return this.reduce(function (old, cur) {
    return old + MathLib.toContentMathML(cur);
  }, '<vector>') + '</vector>';
});


// ### Vector.prototype.toLaTeX()
// Returns a LaTeX representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toLaTeX', function () {
  return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
    return old + '\\\\\n\t' + MathLib.toLaTeX(cur);
  }) + '\n\\end{pmatrix}';
});


// ### Vector.prototype.toMathML()
// Returns the (presentation) MathML representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toMathML', function () {
  return this.reduce(function (old, cur) {
    return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
  }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
});


// ### Vector.prototype.toString()
// Returns a string representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toString', function () {
  return '(' + this.reduce(function (old, cur) {
    return old + ', ' + MathLib.toLaTeX(cur);
  }) + ')';
});


// ### Vector.prototype.vectorproduct()
// Calculates the vectorproduct of two vectors
//
// *@param {vector}*  
// *@returns {vector}*
MathLib.extendPrototype('vector', 'vectorproduct', function (v) {
  var res = [];
  /* TODO: Extend vectorproduct for non three-dimensional vectors */
  if (this.dim === 3 && v.dim === 3) {
    res.push(MathLib.minus(MathLib.times(this[1], v[2]), MathLib.times(this[2], v[1])));
    res.push(MathLib.minus(MathLib.times(this[2], v[0]), MathLib.times(this[0], v[2])));
    res.push(MathLib.minus(MathLib.times(this[0], v[1]), MathLib.times(this[1], v[0])));
  }
  return MathLib.vector(res);
});


// ### Vector.zero()
// Returns a zero vector of given size
//
// *@param {number}* The number of entries in the vector.  
// *@returns {vector}*
MathLib.extend('vector', 'zero', function (n) {
  var res = [], i;
  for (i=0; i<n; i++) {
    res.push(0); 
  }
  return MathLib.vector(res);
});
