// ## Line
// The vector implementation of MathLib makes calculations with lines in the 
// real plane possible. (Higher dimensions will be supported later)
prototypes.line = MathLib.vector([]);
MathLib.line = function (line) {

  line[proto] = prototypes.line;
  Object.defineProperties(line, {
    dim: {
      value: line.length - 1
    }
  });
  return line;
};

// Setting the .constructor property to MathLib.line
MathLib.extendPrototype('line', 'constructor', MathLib.line);

// Setting the .type property to 'line'
MathLib.extendPrototype('line', 'type', 'line');


// ### Line.prototype.draw()
// Draws the line on one or more screens
//
// *@param {screen}* The screen to draw onto.  
// *@param {object}* [options] Drawing options  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'draw', function (screen, options) {
  if (Array.isArray(screen)) {
    var line = this;
    screen.forEach(function (x) {
      x.line(line, options);
    });
  }
  else {
    screen.line(this, options);
  }
  return this;
});


// ### Line.prototype.isEqual()
// Determines if two lines are equal.
//
// *@param {line}*  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isEqual', function (q) {
  var p = this.normalize();
      q = q.normalize();

  if(this.dim !== q.dim) {
    return false;
  }

  return p.every(function (x, i) {
    return MathLib.isEqual(x, q[i]);
  });
});


// ### Line.prototype.isFinite()
// Determines if the line is finite
//
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isFinite', function (q) {
  return !MathLib.isZero(this[this.length - 1]);
});


// ### Line.prototype.isOrthogonalTo()
// Determines if two lines are orthogonal.
//
// *@param {line}*  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isOrthogonalTo', function (l) {
  return MathLib.isEqual(MathLib.point([0,0,1]).crossRatio(this.meet(MathLib.line.infinteLine), l.meet(MathLib.line.infinteLine), MathLib.point.I, MathLib.point.J), -1);
});


// ### Line.prototype.isParallelTo()
// Determines if two lines are parallel.
//
// *@param {line}*  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isParallelTo', function (l) {
  return this.every(function (x, i) {
    return MathLib.isEqual(x, l[i]) || i === l.length - 1;
  });
});


// ### Line.prototype.meet()
// Calculates the meet off two points
//
// *@param {line}*  
// *@returns {point}*
MathLib.extendPrototype('line', 'meet', function (l) {
  return MathLib.point([this[1]*l[2]-this[2]*l[1], l[0]*this[2]-this[0]*l[2], this[0]*l[1]-this[1]*l[0]]);
});


// ### Line.prototype.normalize()
// Normalizes the line.
// (Making the last component 1)
//
// *@returns {line}*
MathLib.extendPrototype('line', 'normalize', function (q) {
  var last = this[this.dim];
  return this.map(function (x) {
    return x / last;
  });
});


// ### Line.prototype.toContentMathML()
// Returns content MathML representation of the line
//
// *@returns {string}*
/* MathLib.extendPrototype('line', 'toContentMathML', function (opt) { */
/* }); */


MathLib.extend('line', 'infiniteLine', MathLib.line([0,0,1]));
