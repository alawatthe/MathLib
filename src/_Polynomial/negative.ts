// ### Polynomial.prototype.negative()
// Returns the negative polynomial
//
// *@returns {polynomial}*
negative() : Polynomial {
	return new MathLib.Polynomial(this.map(MathLib.negative));
}