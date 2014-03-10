test('.csc()', 7, function () {
	// Spec. 1: MathLib.csc(NaN) = NaN
	equal(MathLib.isNaN(MathLib.csc(NaN)), true, 'Spec. 1: MathLib.csc(NaN) = NaN');

	// Spec. 2: MathLib.csc(+0) = +∞
	equal(MathLib.csc(+0), +Infinity, 'Spec. 2: MathLib.csc(+0) = +∞');

	// Spec. 3: MathLib.csc(-0) = -∞
	equal(MathLib.csc(-0), -Infinity, 'Spec. 3: MathLib.csc(-0) = -∞');

	// Spec. 4: MathLib.csc(+∞) = NaN
	equal(MathLib.isNaN(MathLib.csc(+Infinity)), true, 'Spec. 4: MathLib.csc(+∞) = NaN');

	// Spec. 5: MathLib.csc(-∞) = NaN
	equal(MathLib.isNaN(MathLib.csc(-Infinity)), true, 'Spec. 5: MathLib.csc(-∞) = NaN');

	// Spec. 6: otherwise MathLib.csc(x) = cosecant of x
	equal(MathLib.csc(Math.PI / 2), 1, 'Spec. 6: otherwise MathLib.csc(x) = cosecant of x');
	equal(MathLib.csc(-Math.PI / 2), -1, 'Spec. 6: otherwise MathLib.csc(x) = cosecant of x');
});