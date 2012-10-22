// ### Permutation.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {permutation}*
map() {
  return new this.constructor(Array.prototype.map.apply(this, arguments));
}