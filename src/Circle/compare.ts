/**
 * Compares two circles
 *
 * @param {Circle} circle The circle to compare
 * @return {number}
 */
compare(circle : Circle) : number {
	return MathLib.sign(this.center.compare(circle.center)) || MathLib.sign(this.radius - circle.radius);
}