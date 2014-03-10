/**
 * The hyperbolic cosecant function
 * 
 */
fns.csch = {
	functn(x) {
		// csch(-0) should be -∞ not ∞
		if (x === 0) {
			return 1 / x;
		}
		return 2 / (Math.exp(x) - Math.exp(-x));
	},
	cdgroup: 'transc1'
};