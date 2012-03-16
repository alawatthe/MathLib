// ## <a id="Point"></a>Point
// The point implementation of MathLib makes calculations with point in
// arbitrary dimensions possible.
//
// MathLib uses the homogeneous form of a point for calculations and storage.
//
// To create the point (4, 2) on the two dimensional plane use
// `MathLib.point([4, 2, 1])`
// Alternatively you can use
// `MathLib.point(4, 2)`
// The 1 will be added for you.



prototypes.point = MathLib.vector([]);
MathLib.point = function (point) {

  if (arguments.length > 1) {
    point = Array.prototype.slice.call(arguments).concat(1);
  }

  point[proto] = prototypes.point;
  Object.defineProperties(point, {
    dim: {
      value: point.length - 1
    }
  });
  return point;

};


// Setting the .constructor property to MathLib.point
MathLib.extendPrototype('point', 'constructor', MathLib.point);


// Setting the .type property to 'point'
MathLib.extendPrototype('point', 'type', 'point');


// ### Point.prototype.crossRatio()
// Calculates the distance crossratio (A,B,C,D) of four points
// as seen from the current point.
//
// *@param {point}* a The point A  
// *@param {point}* b The point B  
// *@param {point}* c The point C  
// *@param {point}* d The point D  
// *@returns {number}*
MathLib.extendPrototype('point', 'crossRatio', function (a, b, c, d) {
  var x  = this.toArray(),
      m1 = MathLib.matrix([x,a,c]),
      m2 = MathLib.matrix([x,b,d]),
      m3 = MathLib.matrix([x,a,d]),
      m4 = MathLib.matrix([x,b,c]);

  return (m1.det() * m2.det()) / (m3.det() * m4.det());
});


// ### Point.prototype.distanceTo()
// Calculates the distance to an other point.
// If no other point is provided, it calculates the distance to the origin.
//
// *@param {point}* [point] The point to calculate the distance to  
// *@returns {number}*
MathLib.extendPrototype('point', 'distanceTo', function (point) {
  var res = 0,
      i;

  if (arguments.length === 0) {
    for (i = 0; i < this.dim; i++) {
      res += Math.pow(this[i], 2);
    }
    return Math.sqrt(res);
  }

  if (point.type === 'point' && this.dim === point.dim) {
    for (i = 0; i < this.dim; i++) {
      res += Math.pow(this[i] - point[i], 2);
    }
  }
  return Math.sqrt(res);
});


// ### Point.prototype.draw()
// Draws the point on a canvas or svg element.
//
// *@param {MathLib.screen object}* screen The screen to draw onto  
// *@param {object}* [options] Drawing options  
// *@returns {point}* The current point
MathLib.extendPrototype('point', 'draw', function (screen, options) {
  if (Array.isArray(screen)) {
    var point = this;
    screen.forEach(function (x) {
      x.point(point, options);
    });
  }
  else {
    screen.point(this, options);
  }

  return this;
});


// ### Point.prototype.isEqual()
// Determines if the point has the same coordinates as an other point
//
// *@param {point}* The point to compare
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isEqual', function (q) {
  var p = this.normalize();
      q = q.normalize();

  if(this.dim !== q.dim) {
    return false;
  }

  return p.every(function (x, i) {
    return MathLib.isEqual(x, q[i]);
  });
});


// ### Point.prototype.isFinite()
// Determines if the point is finite
//
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isFinite', function (q) {
  return !MathLib.isZero(this[this.length - 1]);
});

 
// ### Point.prototype.isInside()
// Determines wether a point is inside a circle
//
// *@param {circle}*
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isInside', function (a) {
  if (a.type === 'circle') {
    return this.distanceTo(a.center) < a.radius;
  }
});


// ### Point.prototype.isOn()
// Determines wether a point is on a line or circle
//
// *@param {line|point}*
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isOn', function (a) {
  if (a.type === 'line') {
    return this.distanceTo(a.center) === a.radius;
  }
  else if (a.type === 'circle') {
    return this.distanceTo(a.center) === a.radius;
  }
});


// ### Point.prototype.isOutside()
// Determines wether a point is outside a circle
//
// *@param {circle}*
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isOutside', function (a) {
  if (a.type === 'circle') {
    return this.distanceTo(a.center) > a.radius;
  }
});


// ### Point.prototype.lineTo()
// Calculates a line connecting two points
//
// *@param {point}* The point to calculate the line to
// *@returns {line}*
MathLib.extendPrototype('point', 'lineTo', function (q) {
  if (this.dim === 2 && q.dim === 2) {
    return MathLib.line(this, q);
  }
});


// ### Point.prototype.normalize()
// Normalizes the point.
// (Making the last component 1)
//
// *@returns {point}*
MathLib.extendPrototype('point', 'normalize', function (q) {
  var last = this[this.dim];
  return this.map(function (x) {
    return x / last;
  });
});


// ### Point.prototype.reflectAt()
// Reflects the point at an other point
//
// *@returns {point}*
MathLib.extendPrototype('point', 'reflectAt', function (a) {
  if (a.type === 'point') {
    if (this.dim === a.dim) {
      var arr = [], i,
          p = this.normalize();
      a = a.normalize();
      for (i = 0; i < this.dim; i++) {
        arr.push(2 * a[i] - p[i]);
      }
      arr.push(1);
      return MathLib.point(arr);
    }
  }
});


// ### Point.prototype.toArray()
// Converts he Point to a real array
//
// *@returns {array}*
MathLib.extendPrototype('point', 'toArray', function () {
  var res = [], i, ii;
  for (i = 0, ii=this.dim; i <= ii; i++) {
    res.push(this[i]);
  }
  return res;
});


// ### Point.prototype.toComplex()
// Converts a two dimensional point to the corresponding complex number.
//
// *@returns {complex}*
MathLib.extendPrototype('point', 'toComplex', function () {
  if (this.dim === 2) {
    return MathLib.complex(this[0]/this[2], this[1]/this[2]);
  }
});


// ### Point.prototype.toContentMathML()
// Returns content MathML representation of the point
//
// *@returns {string}*
/* MathLib.extendPrototype('point', 'toContentMathML', function (opt) { */
/* }); */


// ### Point.prototype.toLaTeX()
// Returns LaTeX representation of the point
//
// *@returns {boolean}* Optional parameter to indicate if the output should be projective.
// *@returns {string}*
MathLib.extendPrototype('point', 'toLaTeX', function (opt) {
  var p = opt ? this : this.normalize().slice(0, -1);

  return '\\begin{pmatrix}\n\t' + p.reduce(function (old, cur) {
    return old + '\\\\\n\t' + MathLib.toLaTeX(cur);
  }) + '\n\\end{pmatrix}';
});


// ### Point.prototype.toMathML()
// Returns (presentation) MathML representation of the point
//
// *@returns {boolean}* Optional parameter to indicate if the output should be projective.
// *@returns {string}*
MathLib.extendPrototype('point', 'toMathML', function (opt) {
  var p = opt ? this : this.normalize().slice(0, -1);

  return p.reduce(function (old, cur) {
    return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
  }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
});


// ### Point.prototype.toString()
// Returns string representation of the point
//
// *@returns {boolean}* Optional parameter to indicate if the output should be projective.
// *@returns {string}*
MathLib.extendPrototype('point', 'toString', function (opt) {
  var p = opt ? this : this.normalize().slice(0, -1);

  return '(' + p.reduce(function (old, cur) {
    return old + ', ' + MathLib.toString(cur);
  }) + ')';
});



// ### Point.I
// The Point I = (-i, 0, 1).
// This is NOT the complex number i.
//
// *@returns {point}*
MathLib.extend('point', 'I', (function () {
  var i = MathLib.complex(0, -1);
  return MathLib.point([i, 0, 1]);
}()));


// ### Point.J
// The Point J = (i, 0, 1).
//
// *@returns {point}*
MathLib.extend('point', 'J', (function () {
  var i = MathLib.complex(0, 1);
  return MathLib.point([i, 0, 1]);
}()));
