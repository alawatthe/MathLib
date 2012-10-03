// ### Vector.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {vector}*
MathLib.extendPrototype('vector', 'map', function (f) {
  return this.constructor(Array.prototype.map.call(this, f));
});