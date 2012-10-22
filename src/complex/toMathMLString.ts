// ### Complex.prototype.toMathMLString()
// Returns the (presentation) MathML representation of the number
//
// *@returns {string}*
toMathMLString() {
  var str = '', reFlag = false;

  if (!MathLib.isZero(this.re)) {
    str = MathLib.toMathMLString(this.re);
    reFlag = true;
  }
  if (!MathLib.isZero(this.im)) {
    str += MathLib.toMathMLString(this.im, reFlag) + '<mo>&#x2062;</mo><mi>i</mi>';
  }
  if (str.length === 0) {
    str = '<mn>0</mn>';
  }
  return str;
}