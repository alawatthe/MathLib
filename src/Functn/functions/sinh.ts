/**
 * The hyperbolic sine function
 * 
 */
fns.sinh = {
	functn: MathLib.isNative((<any>Math).sinh) || function (x) {
		var ex;

		// sinh(-0) should be -0
		if (x === 0) {
			return x;
		}

		ex = Math.exp(x);
		return (ex - 1 / ex) / 2;
	},
	cdgroup: 'transc1'
};