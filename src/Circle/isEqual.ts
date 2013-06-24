// ### [Circle.prototype.isEqual()](http://mathlib.de/en/docs/Circle/isEqual)
// Checks if two circles are equal
//
// *@return {boolean}*
isEqual(c: Circle) : boolean {
	return MathLib.isEqual(this.radius, c.radius) && this.center.isEqual(c.center);
}