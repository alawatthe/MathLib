// ### Point.prototype.isOutside()
// Determines wether a point is outside a circle
//
// *@param {circle}*
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isOutside', function (a) {
  if (a.type === 'circle') {
    return this.distanceTo(a.center) > a.radius;
  }
});