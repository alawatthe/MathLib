/**
 * The inverse hyperbolic secant function
 * 
 */
fns.arsech = {
	functn: function (x) {
		return Math.log((1 + Math.sqrt(1 - x * x)) / x);
	},
	cdgroup: 'transc1',
	toContentMathMLName: 'arcsech'
};