/**
 * The hyperbolic secant function
 * 
 */
fns.sech = {
	functn(x) {
		var ex = Math.exp(x);
		return 2 / (ex + 1 / ex);
	},
	cdgroup: 'transc1'
};