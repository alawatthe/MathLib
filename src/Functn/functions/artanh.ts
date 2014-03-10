/**
 * The inverse hyperbolic tangent function
 * 
 */
fns.artanh = {
	functn: MathLib.isNative((<any>Math).atanh) || function (x) {
		// Handle ±0
		if (x === 0) {
			return x;
		}
		return 0.5 * Math.log((1 + x) / (1 - x));
	},
	cdgroup: 'transc1',
	toContentMathMLName: 'arctanh'
};