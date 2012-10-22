// ### Complex.prototype.isFinite()
// Determines if the complex number is finite.
//
// *@returns {boolean}*
isFinite() {
  return MathLib.isFinite(this.re) && MathLib.isFinite(this.im);
}