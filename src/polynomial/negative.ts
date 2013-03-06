// ### Polynomial.prototype.negative()
// Returns the negative polynomial
//
// *@returns {polynomial}*
negative() {
	return new MathLib.Polynomial(this.map(MathLib.negative));
}