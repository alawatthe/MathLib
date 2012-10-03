// ### Vector.prototype.isZero()
// Determines if the vector is the zero vector.
//
// *@returns {boolean}*
MathLib.extendPrototype('vector', 'isZero', function (v) {
  return this.every(MathLib.isZero);
});