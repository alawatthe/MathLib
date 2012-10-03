// ### Point.prototype.toComplex()
// Converts a two dimensional point to the corresponding complex number.
//
// *@returns {complex}*
MathLib.extendPrototype('point', 'toComplex', function () {
  if (this.dim === 2) {
    return MathLib.complex(this[0]/this[2], this[1]/this[2]);
  }
});