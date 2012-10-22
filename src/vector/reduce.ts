// ### Vector.prototype.reduce()
// Works like Array.prototype.reduce.
//
// *@returns {any}*
reduce() {
  return Array.prototype.reduce.apply(this, arguments);
}