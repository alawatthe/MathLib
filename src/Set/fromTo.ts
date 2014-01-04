/**
 * Creates a set containing the numbers from a start value to a end value.
 *
 * @param {number} start The number to start from
 * @param {number} end The number to end with
 * @param {number} step The stepsize (default = 1)
 * @return {Set}
 */
static fromTo = function (start : number, end : number, step : number = 1) : Set {
	var i, set = [];

	if (start <= end) {
		for (i = start; i <= end; i += step) {
			set.push(i);
		}
		return new MathLib.Set(set);
	}
};