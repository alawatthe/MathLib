test('.round()', 10, function () {
	// Spec. 1: MathLib.round(NaN) = NaN
	equal(MathLib.isNaN(MathLib.round(NaN)), true, 'Spec. 1: MathLib.round(NaN) = NaN');

	// Spec. 2: MathLib.round(x) = +0 if +0 ≤ x < 0.5
	equal(MathLib.isPosZero(MathLib.round(+0)), true, 'Spec. 2: MathLib.round(x) = +0 if +0 ≤ x < 0.5');
	equal(MathLib.isPosZero(MathLib.round(+0.2)), true, 'Spec. 2: MathLib.round(x) = +0 if +0 ≤ x < 0.5');


	// Spec. 3: MathLib.round(x) = -0 if -0.5 ≤ x ≤ -0
	equal(MathLib.isNegZero(MathLib.round(-0)), true, 'Spec. 3: MathLib.round(x) = -0 if -0.5 ≤ x ≤ -0');
	equal(MathLib.isNegZero(MathLib.round(-0.5)), true, 'Spec. 3: MathLib.round(x) = -0 if -0.5 ≤ x ≤ -0');

	// Spec. 4: MathLib.round(+∞) = +∞
	equal(MathLib.round(+Infinity), +Infinity, 'Spec. 4: MathLib.round(+∞) = +∞');

	// Spec. 5: MathLib.round(-∞) = -∞
	equal(MathLib.round(-Infinity), -Infinity, 'Spec. 5: MathLib.round(-∞) = -∞');

	// Spec. 6: otherwise MathLib.round(x) = ⎣ x+0.5 ⎦
	equal(MathLib.round(2.2), 2, 'Spec. 6: otherwise MathLib.round(x) =  ⎣ x+0.5 ⎦');
	equal(MathLib.round(2.5), 3, 'Spec. 6: otherwise MathLib.round(x) = ⎣ x+0.5 ⎦');
	equal(MathLib.round(-2.2), -2, 'Spec. 6: otherwise MathLib.round(x) = ⎣ x+0.5 ⎦');
});