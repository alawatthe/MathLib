test('.gcd()', 8, function () {
	equal(MathLib.gcd(), 0, 'The empty gcd is zero.');
	equal(MathLib.gcd([]), 0, 'The empty gcd is zero.');
	equal(MathLib.gcd(7), 7);
	equal(MathLib.gcd([7]), 7);
	equal(MathLib.gcd(8, 12), 4);
	equal(MathLib.gcd([8, 12]), 4);
	equal(MathLib.gcd(1, 2, 3), 1);
	equal(MathLib.gcd([1, 2, 3]), 1);
});