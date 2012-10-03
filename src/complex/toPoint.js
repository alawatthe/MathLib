// ### Complex.prototype.toPoint()
// Interprets the complex number as point in the two dimensional plane
//
// *@returns {point}*
MathLib.extendPrototype('complex', 'toPoint', function () {
  return MathLib.point(this.z.concat(1));
});