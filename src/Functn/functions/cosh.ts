/**
 * The hyperbolic cosine function
 * 
 */
fns.cosh = {
	// In my current version of Chrome 34.0.1847.60 beta
	// Math.cosh(-Infinity) = -Infinity 
	// but should be +Infinity
	functn: /*MathLib.isNative((<any>Math).cosh) ||*/ function (x) {
		var ex = Math.exp(x);
		return (ex + 1 / ex) / 2;
	},
	cdgroup: 'transc1'
};