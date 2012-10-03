// ### Polynomial.prototype.mod()
// Reduces the coefficients mod a number
//
// *@param {number}*  
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'mod', function (m) {
  return this.map(function (x) {
    return MathLib.mod(x, m);
  });
});