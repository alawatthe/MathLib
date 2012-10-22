// ### Circle.prototype.isEqual()
// Checks if two circles are equal
//
// *@return {boolean}*
isEqual(c: Circle) {
  return MathLib.isEqual(this.radius, c.radius)  && this.center.isEqual(c.center);
}