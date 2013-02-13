// ### [Rational.prototype.reduce()](http://mathlib.de/en/docs/rational/reduce)
// Reduces the rational number
//
// *@returns {Rational}*
reduce() : Rational {
  var gcd = MathLib.sign(this.denominator) * MathLib.gcd([this.numerator, this.denominator]);
  return new MathLib.Rational(this.numerator/gcd, this.denominator/gcd);
}