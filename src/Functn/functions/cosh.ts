/**
 * The hyperbolic cosine function
 * 
 */
fns.cosh = {
	functn: MathLib.isNative((<any>Math).cosh) || function (x) {
		return (Math.exp(x) + Math.exp(-x)) / 2;
	},
	cdgroup: 'transc1'
};