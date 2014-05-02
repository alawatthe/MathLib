/**
 * Calcultes the norm of the vector.
 *
 * @param {number} p The p for the p-norm  
 * @return {number}
 */
norm(p = 2) : number {
	if (p === 2) {
		return MathLib.hypot.apply(null, this.toArray());
	}
	else if (p === Infinity) {
		return Math.max.apply(null, this.map(Math.abs).toArray());
	}
	else {
		return MathLib.root(this.reduce(function (prev, curr) {
			return prev + Math.pow(Math.abs(curr), p);
		}, 0), p);
	}
}