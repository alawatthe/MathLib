// ### Polynomial.prototype.integrate()
// Integrates the polynomial
//
// *@param {number}* [n] the number of times to integrate the polynomial.  
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'integrate', function (n) {
  var temparr = [],
      i;
  n = n || 1;

  if (MathLib.isZero(n)) {
    return this;
  }
  if (n < 0) {
    return this.differentiate(-n);
  }

  for (i = 0; i < n; i++) {
    temparr.push(0);
  }

  for (i = 0; i <= this.deg; i++) {
    temparr[i + n] = this[i] / MathLib.fallingFactorial(i + n, n);
  }
  return MathLib.polynomial(temparr);
});