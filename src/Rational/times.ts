// ### [Rational.prototype.times()](http://mathlib.de/en/docs/Rational/times)
// Multiplies rational numbers
//
// *@param {Rational|number}* The number to be multiplied  
// *@return {Rational}*
times(r) {
	if (r.type === 'rational') {
		return new MathLib.Rational(MathLib.times(this.numerator, r.numerator), MathLib.times(this.denominator, r.denominator));
	}
	else if (typeof r === 'number') {
		return new MathLib.Rational(MathLib.times(this.numerator, r), this.denominator);
	}
	// For complex numbers, matrices, vectors, polynomials
	else {
		return r.times(this);
	}
}