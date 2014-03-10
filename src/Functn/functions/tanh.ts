/**
 * The hyperbolic tangent function
 * 
 */
fns.tanh = {
	functn: MathLib.isNative((<any>Math).tanh) || function (x) {
		var p;

		// Handle ±0 and ±∞ separately
		// Their values happen to coincide with sign
		if (x === 0 || !MathLib.isFinite(x)) {
			return MathLib.sign(x);
		}

		p = Math.exp(x);
		return (p * p - 1) / (p * p + 1);
	},
	cdgroup: 'transc1'
};