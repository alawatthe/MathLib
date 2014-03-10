/**
 * The hyperbolic sine function
 * 
 */
fns.sinh = {
	functn: MathLib.isNative((<any>Math).sinh) || function (x) {
		// sinh(-0) should be -0
		if (x === 0) {
			return x;
		}
		return (Math.exp(x) - Math.exp(-x)) / 2;
	},
	cdgroup: 'transc1'
};