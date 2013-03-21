// ### Point.prototype.distanceTo()
// Calculates the distance to an other point.
// If no other point is provided, it calculates the distance to the origin.
//
// *@param {point}* [point] The point to calculate the distance to  
// *@returns {number}*
distanceTo(point : Point) : number {
	if (arguments.length === 0) {
		return MathLib.hypot.apply(null, this.slice(0, -1)) / Math.abs(this[this.dimension]);
	}

	if (point.type === 'point' && this.dimension === point.dimension) {
		return MathLib.hypot.apply(null, this.normalize().minus(point.normalize()).slice(0, -1));
	}
}