/**
 * Multiplies all elements by an argument.
 *
 * @param {number|MathLib object} n The object to multiply the elements with
 * @return {Set}
 */
times(n : any) : any {
	return this.map(function (x) {
		return MathLib.times(x, n);
	});
}
