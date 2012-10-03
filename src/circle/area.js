// ### Circle.prototype.area()
// Calculates the area of the circle.
//
// *@param {number}* The area of the circle
MathLib.extendPrototype('circle', 'area', function () {
  return this.radius * this.radius * Math.PI;
});