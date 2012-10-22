// ### Circle.prototype.reflectAt()
// Reflect the circle at a point or line
//
// *@return {circle}*
reflectAt(a) {
  return new MathLib.Circle(this.center.reflectAt(a), this.radius);
}