// ### Matrix.prototype.times()
// Multiplies the current matrix with a number, a matrix, a point or a vector.
//
// *@param {number|matrix|point|rational|vector}*  
// *@returns {matrix|point|vector}*
times(a) {
	var res = [], temp, i, j, k;
	if(a.type === 'rational') {
		a = a.toNumber(); 
	}
	if (typeof a === 'number' || a.type === 'complex') {
		return this.map(function(x) {
			return MathLib.times(x, a);
		});
	}

	else if (a.type === 'matrix') {
		if (this.cols === a.rows) {
			for (i = 0; i < this.rows; i++) {
				res[i] = [];
				for (j = 0; j < a.cols; j++) {
					temp = 0;

					for (k = 0; k < this.cols; k++) {
						temp = MathLib.plus(temp, MathLib.times(this[i][k], a[k][j]));
					}
					res[i][j] = temp;
				}
			}
			return new MathLib.Matrix(res);
		}
	}

	else if (a.type === 'point' || a.type === 'vector') {
		if (this.cols === a.length) {
			for (j = 0; j < this.rows; j++) {
				temp = 0;
				for (k = 0; k < this.cols; k++) {
					temp = MathLib.plus(temp, MathLib.times(this[j][k], a[k]));
				}
				res.push(temp);
			}
			return new a.constructor(res);
		}
	}
}