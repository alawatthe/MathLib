// ### Circle.prototype.isEqual()
// Checks if two circles are equal
//
// *@return {boolean}*
MathLib.extendPrototype('circle', 'isEqual', function (c) {
  return MathLib.isEqual(this.radius, c.radius)  && this.center.isEqual(c.center);
});