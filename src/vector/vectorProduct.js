// ### Vector.prototype.vectorproduct()
// Calculates the vectorproduct of two vectors
//
// *@param {vector}*  
// *@returns {vector}*
MathLib.extendPrototype('vector', 'vectorproduct', function (v) {
  var res = [];
  /* TODO: Extend vectorproduct for non three-dimensional vectors */
  if (this.length === 3 && v.length === 3) {
    res.push(MathLib.minus(MathLib.times(this[1], v[2]), MathLib.times(this[2], v[1])));
    res.push(MathLib.minus(MathLib.times(this[2], v[0]), MathLib.times(this[0], v[2])));
    res.push(MathLib.minus(MathLib.times(this[0], v[1]), MathLib.times(this[1], v[0])));
  }
  return MathLib.vector(res);
});