// ### Circle.prototype.circumference()
// Calculates the circumference of the circle.
//
// *@param {number}* The circumference of the circle
MathLib.extendPrototype('circle', 'circumference', function () {
  return 2 * this.radius * Math.PI;
});