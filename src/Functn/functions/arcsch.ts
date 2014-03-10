/**
 * The inverse hyperbolic cosecant function
 * 
 */
fns.arcsch = {
	functn: function (x) {
		// Handle ±0 and ±∞ separately
		if (x === 0 || !MathLib.isFinite(x)) {
			return 1 / x;
		}
		return Math.log(1 / x + Math.sqrt(1 / (x * x) + 1));
	},
	cdgroup: 'transc1',
	toContentMathMLName: 'arccsch'
};