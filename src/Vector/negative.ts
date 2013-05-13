// ### [Vector.prototype.negative()](http://mathlib.de/en/docs/Vector/negative)
// Returns the negative vector.
//
// *@return {Vector}*
negative() : Vector {
	return this.map(MathLib.negative);
}