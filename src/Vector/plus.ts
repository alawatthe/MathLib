// ### [Vector.prototype.plus()](http://mathlib.de/en/docs/Vector/plus)
// Calculates the sum of two vectors.
//
// *@param {Vector}*  
// *@return {Vector}*
plus(v : Vector) : Vector {
	if (this.length === v.length) {
		return new MathLib.Vector(this.map(function (x, i) {
			return MathLib.plus(x, v[i]);
		}));
	}
	else {
		MathLib.error({message: 'Vector sizes not matching', method: 'Vector#plus'});
		return;
	}
}