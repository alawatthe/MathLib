// ### [Vector.prototype.negative()](http://mathlib.de/en/docs/vector/negative)
// Returns the negative vector.
//
// *@returns {Vector}*
negative() : Vector {
	return this.map(MathLib.negative);
}