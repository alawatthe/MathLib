// ### Polynomial.prototype.tangent()
// Returns the tangent to the polynomial at a given point
//
// *@param{number}* The x-value of the point.  
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'tangent', function (p) {
  var value = this.valueAt(p),
      slope = this.differentiate().valueAt(p);
  return MathLib.polynomial([value - slope * p, slope]);
});