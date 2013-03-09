// ### Polynomial.prototype.isPrimitive()
// Decides if the polynomial is primitive
//
// *@returns {boolean}*
isPrimitive() : bool {
	return MathLib.gcd(this) === 1;
}