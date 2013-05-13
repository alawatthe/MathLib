// ### [Vector.prototype.areLinearIndependent()](http://mathlib.de/en/docs/Vector/areLinearIndependent)
// Checks if the vectors are linear independent.
//
// *@param {array}* An array containing the vectors.  
// *@return {boolean}*
static areLinearIndependent = function (v : Vector[]) : bool {
	var n = v.length,
			m = v[0].length;

	if (n > m) {
		return false;
	}

	if (! v.every(function (x) {
		return x.length === m;
		}) ) {
		return undefined;
	}

	return (new MathLib.Matrix(v)).rank() === n;
};