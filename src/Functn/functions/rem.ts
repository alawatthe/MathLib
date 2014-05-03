/**
 * The remainder function
 * 
 */
fns.rem = {
	functn(n, m) {
		var x = 4,
				y = -3;

		if (!MathLib.isFinite(m)) {
			return NaN;
		}

		// This is a bug fix for a very weird bug in Safari 5 on Windows 7.
		// Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2
		// It does not occur in OS X 10.6. I can't test other platforms right now.
		// 
		//   > 4%-3 = 1
		// This is correct. But if we do the following:
		//   > n = 4;
		//   > m = -3;
		//   > n%m = -1
		// This is obviously not correct.
		/* istanbul ignore if */
		if (x % y === -1 && n > 0 && m < 0) {
			return -(n % m);
		}

		return n % m;
	},
	args: ['n', 'm'],
	cdgroup: 'integer1',
	contentMathMLName: 'remainder',
	toLaTeX: ['', ' \\operatorname{rem} ', ''],
	toMathML: ['', '<mi>rem</mi>', ''],
	toString: ['', ' rem ', '']
};