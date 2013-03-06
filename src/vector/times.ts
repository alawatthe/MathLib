// ### [Vector.prototype.times()](http://mathlib.de/en/docs/vector/times)
// Multiplies the vector by a (complex) number or a matrix.
// The vector is multiplied from left to the matrix. 
// If you want to multiply it from the right use
// matrix.times(vector) instead of vector.times(matrix)
//
// *@param {number|complex|matrix}*  
// *@returns {vector}*
times(n : any) : any {
	var res = [], i, ii;
	if(n.type === 'rational') {
		n = n.toNumber(); 
	}
	if (typeof n === "number" || n.type === "complex") {
		return this.map(function (x) {
			return MathLib.times(n, x);
		});
	}
	if (n.type === "matrix") {
		res = n.toColVectors();
		for (i = 0, ii = res.length; i < ii; i++) {
			res[i] = this.scalarProduct(res[i]);
		}
		return new MathLib.Vector(res);
	}
}