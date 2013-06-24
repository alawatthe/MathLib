// ### [Vector.prototype.minus()](http://mathlib.de/en/docs/Vector/minus)
// Calculates the difference of two vectors.
//
// *@param {Vector}* The vector to be subtracted.  
// *@return {Vector}*
minus(v : Vector) : Vector {
	if (this.length === v.length) {
		return this.plus(v.negative());
	}
}