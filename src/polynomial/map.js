// ### Polynomial.prototype.map()
// Works like the Array.prototype.map function
//
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'map', function (f) {
  return MathLib.polynomial(Array.prototype.map.call(this, f));
});