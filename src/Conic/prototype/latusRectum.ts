/**
 * Calculates the latusRectum of a conic.
 *
 * @return {number}
 */
latusRectum() : number {
	var normalForm = this.normalize(),
			a = normalForm.primal[0][0],
			c = normalForm.primal[1][1],
			min = Math.min(Math.abs(a), Math.abs(c)),
			max = Math.max(Math.abs(a), Math.abs(c));

	if (!this.isDegenerated()) {

		// Parabola
		if (c === 0) {
			return -2 * normalForm.primal[1][2] / a;
		}

		return 2 * Math.sqrt(max) / min;
	}
}