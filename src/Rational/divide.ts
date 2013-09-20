// ### [Rational.prototype.divide()](http://mathlib.de/en/docs/Rational/divide)
// Divides rational numbers
//
// *@param {Rational|number}* The divisor  
// *@return {Rational}*
divide(r) {
	if (r.type === 'rational') {
		return new MathLib.Rational(MathLib.times(this.numerator, r.denominator), MathLib.times(this.denominator, r.numerator));
	}
	else if (typeof r === 'number') {
		return new MathLib.Rational(this.numerator, MathLib.times(this.denominator, r));
	}
	// For complex numbers
	else {
		return r.inverse().times(this);
	}
}