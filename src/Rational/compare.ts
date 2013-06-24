// ### [Rational.prototype.compare()](http://mathlib.de/en/docs/rational/compare)
// Compares two rational numbers
//
// *@param {Rational}* The number to compare  
// *@return {number}*
compare(r : Rational) : number {
	return MathLib.sign(this.numerator * r.denominator - this.denominator * r.numerator);
}