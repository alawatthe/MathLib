// ### [Circle.prototype.compare()](http://mathlib.de/en/docs/Circle/compare)
// Compares two circles
//
// *@param {Circle}* The circle to compare  
// *@return {number}*
compare(c : Circle) : number {
	return MathLib.sign(this.center.compare(c.center)) || MathLib.sign(this.radius - c.radius);
}