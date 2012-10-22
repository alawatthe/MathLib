// ### Polynomial.prototype.forEach()
// Works like the Array.prototype.forEach function
//
// *@returns {array}*
forEach() {
  return Array.prototype.forEach.apply(this, arguments);
}