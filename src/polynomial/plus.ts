// ### Polynomial.prototype.plus()
// Adds a number or a polynomial
//
// *@param {boolean}* [all] If the value is true, the number is added to all 
// coefficients.  
// *@returns {polynomial}*
plus(a, all) {
  var temparr = [],
      i;
  if (typeof a === 'number') {
    if (all) {
      return this.map(function (b) {
        return MathLib.plus(a, b);
      });
    }
    else {
      temparr = this.slice();
      temparr[0] = MathLib.plus(temparr[0], a);
    }
  }
  else if (a.type === 'polynomial') {
    for (i = 0; i <= Math.min(this.deg, a.deg); i++) {
      temparr[i] = MathLib.plus(this[i],	a[i]);
    }
    temparr = temparr.concat((this.deg > a.deg ? this : a).slice(i));
  }
  return new MathLib.Polynomial(temparr);
}