// ### Polynomial.prototype.valueAt()
// Evaluates the polynomial at a given point 
//
// *@param {number|complex|matrix}*  
// *@returns {number|complex|matrix}*
valueAt(x) {
	var pot = MathLib.is(x, 'matrix') ? MathLib.Matrix.identity(x.rows, x.cols) : 1,
			res = MathLib.is(x, 'matrix') ? MathLib.Matrix.zero(x.rows, x.cols) : 0,
			i, ii;
	
	for (i=0, ii=this.deg; i<=ii; i++) {
		res = MathLib.plus(res, MathLib.times(this[i], pot));
		pot = MathLib.times(pot, x);
	}
	return res;
}