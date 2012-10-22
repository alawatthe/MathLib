// ### Polynomial.prototype.map()
// Works like the Array.prototype.map function
//
// *@returns {polynomial}*
map(f) {
  return new MathLib.Polynomial(Array.prototype.map.call(this, f));
}