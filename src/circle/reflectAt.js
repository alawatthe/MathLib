// ### Circle.prototype.reflectAt()
// Reflect the circle at a point or line
//
// *@return {circle}*
MathLib.extendPrototype('circle', 'reflectAt', function (a) {
  return MathLib.circle(this.center.reflectAt(a), this.radius);
});