/**
 * Calculates the linear eccentricity of a conic.
 *
 * @return {number}
 */
linearEccentricity() : number {
	var normalForm = this.normalize(),
			a = normalForm.primal[0][0],
			c = normalForm.primal[1][1],
			max = Math.max(Math.abs(a), Math.abs(c)),
			min = Math.min(Math.abs(a), Math.abs(c));

	if (!this.isDegenerated()) {
		// parabola
		if (c === 0) {
			return normalForm.primal[1][2] / (-2 * a);
		}

		if (c > 0) {
			return Math.sqrt(1 / min - 1 / max);
		}
		return Math.sqrt(1 / max + 1 / min);
	}
}