// ### Vector.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {vector}*
forEach(f) {
  Array.prototype.forEach.call(this, f);
}