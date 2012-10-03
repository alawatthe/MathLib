// ### Point.prototype.isInside()
// Determines wether a point is inside a circle
//
// *@param {circle}*
// *@returns {boolean}*
MathLib.extendPrototype('point', 'isInside', function (a) {
  if (a.type === 'circle') {
    return this.distanceTo(a.center) < a.radius;
  }
});