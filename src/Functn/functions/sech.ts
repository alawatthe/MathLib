/**
 * The hyperbolic secant function
 * 
 */
fns.sech = {
	functn(x) {
		return 2 / (Math.exp(x) + Math.exp(-x));
	},
	cdgroup: 'transc1'
};