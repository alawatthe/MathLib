// ### [Rational.prototype.plus()](http://mathlib.de/en/docs/rational/plus)
// Adds rational numbers
//
// *@param {Rational, number}* The number to be added  
// *@returns {Rational}*
plus(r) {
	var n = this.numerator,
			d = this.denominator;

	if (r.type === "rational") {
    return new MathLib.Rational(MathLib.plus(MathLib.times(d, r.numerator), MathLib.times(n, r.denominator)),
    	MathLib.times(d, r.denominator));
  }
  else if (typeof r === "number") {
    return new MathLib.Rational(MathLib.plus(n, MathLib.times(r, d)), d);
  }
  // For complex numbers
  else {
  	return r.plus(this);
  }
}