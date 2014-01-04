/**
 * Checks if two circles are equal
 *
 * @param {Circle} circle The circle to compare
 * @return {boolean}
 */
isEqual(circle : Circle) : boolean {
	return MathLib.isEqual(this.radius, circle.radius) && this.center.isEqual(circle.center);
}