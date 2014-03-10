/**
 * The inverse hyperbolic cosine function
 * 
 */
fns.arcosh = {
	functn: MathLib.isNative((<any>Math).acosh) || function (x) {
		return Math.log(x + Math.sqrt(x * x - 1));
	},
	cdgroup: 'transc1',
	toContentMathMLName: 'arccosh'
};