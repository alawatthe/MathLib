// ### Polynomial.prototype.isEqual()
// Decides if two polynomials are equal.
//
// *@param {polynomial}*  
// *@returns {boolean}*
isEqual(p) {
	var i, ii;
	if (this.deg !== p.deg || this.subdeg !== p.subdeg) {
		return false;
	}
	for (i=0, ii=this.deg; i<=ii; i++) {
		if (!MathLib.isEqual(this[i], p[i])) {
			return false;
		}
	}
	return true;
}