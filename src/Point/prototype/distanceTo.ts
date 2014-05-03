/**
 * Calculates the distance to an other point.
 * If no other point is provided, it calculates the distance to the origin.
 *
 * @param {Point} p The point to calculate the distance to  
 * @return {number}
 */
distanceTo(p : Point) : number {
	if (arguments.length === 0) {
		return MathLib.hypot.apply(null, this.slice(0, -1)) / Math.abs(this[this.dimension]);
	}

	if (p.type === 'point' && this.dimension === p.dimension) {
		return MathLib.hypot.apply(null, this.normalize().minus(p.normalize()).slice(0, -1));
	}
}