test('.ceil()', 7, function () {
	// Spec. 1: MathLib.ceil(NaN) = NaN
	equal(MathLib.isNaN(MathLib.ceil(NaN)), true, 'Spec. 1: MathLib.ceil(NaN) = NaN');

	// Spec. 2: MathLib.ceil(+0) = +0
	equal(MathLib.isPosZero(MathLib.ceil(+0)), true, 'Spec. 2: MathLib.ceil(+0) = +0');

	// Spec. 3: MathLib.ceil(-0) = -0
	equal(MathLib.isNegZero(MathLib.ceil(-0)), true, 'Spec. 3: MathLib.ceil(-0) = -0');

	// Spec. 4: MathLib.ceil(+∞) = +∞
	equal(MathLib.ceil(+Infinity), +Infinity, 'Spec. 4: MathLib.ceil(+∞) = +∞');

	// Spec. 5: MathLib.ceil(-∞) = -∞
	equal(MathLib.ceil(-Infinity), -Infinity, 'Spec. 5: MathLib.ceil(-∞) = -∞');

	// Spec. 6: otherwise MathLib.ceil(x) = ⎡x⎤
	equal(MathLib.ceil(2.2), 3, 'Spec. 6: otherwise MathLib.ceil(x) =  ⎡x⎤');
	equal(MathLib.ceil(-2.2), -2, 'Spec. 6: otherwise MathLib.ceil(x) = ⎡x⎤');
});