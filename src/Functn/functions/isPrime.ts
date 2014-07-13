/**
 * Checks whether a number is a prime or not
 *
 */
fns.isPrime = {
	functn(x) {
		var sqrt = Math.sqrt(x), i;
		if (x % 1 === 0 && x > 1) {
			if (x === 2) {
				return true;
			}
			if (x % 2 === 0) {
				return false;
			}
			for (i = 3; i <= sqrt; i += 2) {
				if (x % i === 0) {
					return false;
				}
			}
			return true;
		}
		return false;
	},
	toContentMathML: ['<csymbol cd="set1">in</csymbol>', '<csymbol cd="setname1">P</csymbol>']
};
