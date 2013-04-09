test('.abs()', 7, function () {
	// Spec. 1: MathLib.abs(NaN) = NaN
	equal(MathLib.isNaN(MathLib.abs(NaN)), true, 'Spec. 1: MathLib.abs(NaN) = NaN');

	// Spec. 2: MathLib.abs(+0) = +0
	equal(MathLib.isPosZero(MathLib.abs(+0)), true, 'Spec. 2: MathLib.abs(+0) = +0');

	// Spec. 3: MathLib.abs(-0) = +0
	equal(MathLib.isPosZero(MathLib.abs(-0)), true, 'Spec. 3: MathLib.abs(-0) = +0');

	// Spec. 4: MathLib.abs(+∞) = ∞
	equal(MathLib.abs(+Infinity), +Infinity, 'Spec. 4: MathLib.abs(+∞) = ∞');

	// Spec. 5: MathLib.abs(-∞) = ∞
	equal(MathLib.abs(-Infinity), +Infinity, 'Spec. 5: MathLib.abs(-∞) = ∞');

	// Spec. 6: otherwise MathLib.abs(x) = absolute value of x
	equal(MathLib.abs(1), 1, 'Spec. 6: otherwise MathLib.abs(x) = absolute value of x');
	equal(MathLib.abs(-1), 1, 'Spec. 6: otherwise MathLib.abs(x) =  absolute value of x');
});