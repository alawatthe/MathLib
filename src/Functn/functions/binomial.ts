/**
 * The binomial coefficient
 * 
 */
fns.binomial = {
	functn(n, k) {
		// TODO: non integer values
		// What should be done with very big numbers?
		var binomial = 1, i, sign;

		// not finite means ±∞ or NaN
		if (MathLib.isNaN(n) || !MathLib.isFinite(k)) {
			return NaN;
		}

		// Exit early for areas which return 0
		if ( (n >= 0 && k <= -1)
			|| (n >= 0 && k > n)
			|| (k <  0 && k > n)) {
			return 0;
		}

		if (n < 0) {
			if (k < 0) {
				// negative odd number % 2 = -1 and not +1
				// This leads to the + 1 here.
				return ((n + k) % 2 * 2 + 1) * MathLib.binomial(-k - 1, -n - 1);
			}
			else {
				if (k === 0) {
					sign = 1;
				}
				else {
					sign = -(k % 2 * 2 - 1);
				}
				binomial = sign * MathLib.binomial(k - n - 1, k);
			}
		}

		if (k > n / 2) {
			k = n - k;
		}

		for (i = 1; i <= k; i++) {
			binomial *= (n + 1 - i) / i;
		}
		return binomial;
	},
	args: ['n', 'k'],
	cdgroup: 'combinat1',
	toLaTeX: ['{', ' \\choose ', '}'],
	toMathML: ['<mfenced><mfrac linethickness=\"0\">', '', '</mfrac></mfenced>']
};