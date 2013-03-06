// ### Permutation.prototype.times()
// Multiplies two permutations
//
// *@param{number}* [size] The size of the matrix  
// *@returns {matrix}*
toMatrix(n : number) : Matrix {
	var arr = [],
			res = [],
			temp, i, ii;
			n = n || this.length;

	for (i = 0, ii = n - 1; i < ii; i++) {
		arr.push(0);
	}
	arr = arr.concat([1]).concat(arr);
	for (i = 0, ii = n; i < ii; i++) {
		temp = n - this.applyTo(i) - 1;
		res.push(arr.slice(temp, temp + n));
	}
	return new MathLib.Matrix(res);
}