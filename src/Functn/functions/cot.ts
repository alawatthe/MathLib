/**
 * The cotangent function
 * 
 */
fns.cot = {
	functn(x) {
		// Handle ±0 separate, because tan(pi/2 ± 0) is not ±∞
		if (x === 0) {
			return 1 / x;
		}
		// cot(x) = tan(pi/2 - x) is better than 1/tan(x)
		return Math.tan(1.5707963267948966 - x);
	},
	cdgroup: 'transc1'
};