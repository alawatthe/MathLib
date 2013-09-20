// ### [Conic.prototype.eccentricity()](http://mathlib.de/en/docs/Conic/eccentricity)
// Calculates the eccentricity of a conic.
// 
// *@return {number}*
eccentricity() : number {
	var min, max,
			normalform = this.normalize(),
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