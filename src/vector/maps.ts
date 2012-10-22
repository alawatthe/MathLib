// ### Vector.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {vector}*
map(f) {
  return new this.constructor(Array.prototype.map.call(this, f));
}