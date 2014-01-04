/**
 * Calculates the eccentricity of a conic.
 *
 * @return {number}
 */
eccentricity() : number {
	var normalform = this.normalize(),
			a = normalform.primal[0][0],
			c = normalform.primal[1][1];

	if (!this.isDegenerated()) {
		// parabola
		if (c === 0) {
			return 1;
		}
		if (c > 0) {
			return Math.sqrt(1 - c / a);
		}
		return Math.sqrt(1 - a / c);
	}
}