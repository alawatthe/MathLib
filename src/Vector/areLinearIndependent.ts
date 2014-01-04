/**
 * Checks if the vectors are linear independent.
 *
 * @param {array} vectors An array containing the vectors.  
 * @return {boolean}
 */
static areLinearIndependent = function (vectors : Vector[]) : boolean {
	var n = vectors.length,
			m = vectors[0].length;

	if (n > m) {
		return false;
	}

	if (! vectors.every(function (x) {
		return x.length === m;
		}) ) {
		return undefined;
	}

	return (new MathLib.Matrix(vectors)).rank() === n;
};