// ### Polynomial.prototype.mod()
// Reduces the coefficients mod a number
//
// *@param {number}*  
// *@returns {polynomial}*
mod(m) : Polynomial {
	return this.map(function (x) {
		return MathLib.mod(x, m);
	});
}