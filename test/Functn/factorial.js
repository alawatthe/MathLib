test('.factorial()', 10, function () {
	// Spec. 1: MathLib.factorial(NaN) = NaN
	equal(MathLib.isNaN(MathLib.factorial(NaN)), true, 'Spec. 1: MathLib.factorial(NaN) = NaN');

	// Spec. 2: MathLib.factorial(+∞) = +∞
	equal(MathLib.factorial(+Infinity), Infinity, 'Spec. 2: MathLib.factorial(+∞) = +∞');

	// Spec. 3: MathLib.factorial(-∞) = NaN
	equal(MathLib.isNaN(MathLib.factorial(-Infinity)), true, 'Spec. 3: MathLib.factorial(-∞) = NaN');

	// Spec. 4: MathLib.factorial(n) = NaN if n<0 or n not an integer
	equal(MathLib.isNaN(MathLib.factorial(-1)), true, 'Spec. 4: MathLib.factorial(n) = NaN if n<0 or n not an integer');
	equal(MathLib.isNaN(MathLib.factorial(1.5)), true, 'Spec. 4: MathLib.factorial(n) = NaN if n<0 or n not an integer');

	// Spec. 5: MathLib.factorial(n) = ∞ if n is an integer greater 170
	equal(MathLib.factorial(171), Infinity, 'Spec. 5: MathLib.factorial(n) = ∞ if n is an integer greater 170');

	// Spec. 6: MathLib.factorial(n) = n!
	equal(MathLib.factorial(+0), 1, 'Spec. 6: MathLib.factorial(n) = n!');
	equal(MathLib.factorial(-0), 1, 'Spec. 6: MathLib.factorial(n) = n!');
	equal(MathLib.factorial(1), 1, 'Spec. 6: MathLib.factorial(n) = n!');
	equal(MathLib.factorial(6), 720, 'Spec. 6: MathLib.factorial(n) = n!');
});