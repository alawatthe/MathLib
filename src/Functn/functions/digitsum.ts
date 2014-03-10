/**
 * The digitsum function
 * 
 */
fns.digitsum = {
	functn(x) {
		var out = 0;
		while (x > 9) {
			out += x % 10;
			x = Math.floor(x / 10);
		}
		return out + x;
	},
	toContentMathML: ['<ci>digitsum</ci>']
};