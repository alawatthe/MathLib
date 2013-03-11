// ### [Vector.prototype.isZero()](http://mathlib.de/en/docs/vector/isZero)
// Determines if the vector is the zero vector.
//
// *@returns {boolean}*
isZero() : bool {
	return this.every(MathLib.isZero);
}