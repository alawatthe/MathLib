/**
 * The inverse hyperbolic sine function
 * 
 */
fns.arsinh = {
	functn: MathLib.isNative((<any>Math).asinh) || function (x) {
		// Handle ±0 and ±∞ separately
		if (x === 0 || !MathLib.isFinite(x)) {
			return x;
		}
		return Math.log(x + Math.sqrt(x * x + 1));
	},
	cdgroup: 'transc1',
	toContentMathMLName: 'arcsinh'
};