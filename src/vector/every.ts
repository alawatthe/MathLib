// ### Vector.prototype.every()
// Works like Array.prototype.every.
//
// *@returns {boolean}*
every(f) {
  return Array.prototype.every.call(this, f);
}