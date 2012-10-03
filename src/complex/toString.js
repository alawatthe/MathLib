// ### Complex.prototype.toString()
// Custom toString function
//
// *@returns {string}*
MathLib.extendPrototype('complex', 'toString', function () {
  var str = '';

  if (!MathLib.isZero(this.re)) {
    str = MathLib.toString(this.re);
  }
  if (!MathLib.isZero(this.im)) {
    str +=  (this.im > 0 ? (str.length ? '+' : '') : '-') + MathLib.toString(Math.abs(this.im)) + 'i';
  }
  if (str.length === 0) {
    str = '0';
  }
  return str;
});