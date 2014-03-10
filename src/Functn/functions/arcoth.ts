/**
 * The inverse hyperbolic cotangent function
 * 
 */
fns.arcoth = {
	functn(x) {
		// Handle ±∞
		if (!MathLib.isFinite(x)) {
			return 1 / x;
		}
		return 0.5 * Math.log((x + 1) / (x - 1));
	},
	cdgroup: 'transc1',
	toContentMathMLName: 'arccoth'
};