/**
 * Multiplies all elements in the set if no argument is passed.
 * Multiplies all elements by a argument if one is passed.
 *
 * @param {number|MathLib object} n The object to multiply the elements with
 * @return {Set}
 */
times(n : any) : any {
	if (!arguments.length) {
		return MathLib.times.apply(null, this.toArray());
	}
	else {
		return this.map(function (x) {
			return MathLib.times(x, n);
		});
	}
}