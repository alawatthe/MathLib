// ### [Rational.prototype.minus()](http://mathlib.de/en/docs/Rational/minus)
// Subtracts rational numbers
//
// *@param {Rational|number}* The number to be subtracted  
// *@return {Rational}*
minus(r) {
	var n = this.numerator,
			d = this.denominator;

	if (r.type === 'rational') {
		return new MathLib.Rational(MathLib.minus(MathLib.times(n, r.denominator), MathLib.times(d, r.numerator)),
			MathLib.times(d, r.denominator));
	}
	else if (typeof r === 'number') {
		return new MathLib.Rational(MathLib.minus(n, MathLib.times(r, d)), d);
	}
	// For complex numbers
	else {
		return r.minus(this).negative();
	}
}