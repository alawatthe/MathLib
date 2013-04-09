test('.sec()', 7, function () {
	// Spec. 1: MathLib.sec(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sec(NaN)), true, 'Spec. 1: MathLib.sec(NaN) = NaN');

	// Spec. 2: MathLib.sec(+0) = 1
	equal(MathLib.sec(+0), 1, 'Spec. 2: MathLib.sec(+0) = 1');

	// Spec. 3: MathLib.sec(-0) = 1
	equal(MathLib.sec(-0), 1, 'Spec. 3: MathLib.sec(-0) = 1');

	// Spec. 4: MathLib.sec(+∞) = NaN
	equal(MathLib.isNaN(MathLib.sec(+Infinity)), true, 'Spec. 4: MathLib.sec(+∞) = NaN');

	// Spec. 5: MathLib.sec(-∞) = NaN
	equal(MathLib.isNaN(MathLib.sec(-Infinity)), true, 'Spec. 5: MathLib.sec(-∞) = NaN');

	// Spec. 6: otherwise MathLib.sec(x) = secant of x
	equal(MathLib.sec(Math.PI), -1, 'Spec. 6: otherwise MathLib.sec(x) = secant of x');
	equal(MathLib.sec(2 * Math.PI), 1, 'Spec. 6: otherwise MathLib.sec(x) = secant of x');
});