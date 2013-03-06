// ### Polynomial.prototype.tangent()
// Returns the tangent to the polynomial at a given point
//
// *@param{number}* The x-value of the point.  
// *@returns {polynomial}*
tangent(p) {
	var value = this.valueAt(p),
			slope = this.differentiate().valueAt(p);
	return new MathLib.Polynomial([value - slope * p, slope]);
}