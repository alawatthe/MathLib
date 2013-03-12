// ### [Circle.prototype.reflectAt()](http://mathlib.de/en/docs/Circle/reflectAt)
// Reflect the circle at a point or line
//
// *@return {Circle}*
reflectAt(a) : Circle {
	return new MathLib.Circle(this.center.reflectAt(a), this.radius);
}