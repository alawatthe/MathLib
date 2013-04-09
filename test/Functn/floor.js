test('.floor()', 7, function () {
	// Spec. 1: MathLib.floor(NaN) = NaN
	equal(MathLib.isNaN(MathLib.floor(NaN)), true, 'Spec. 1: MathLib.floor(NaN) = NaN');

	// Spec. 2: MathLib.floor(+0) = +0
	equal(MathLib.isPosZero(MathLib.floor(+0)), true, 'Spec. 2: MathLib.floor(+0) = +0');

	// Spec. 3: MathLib.floor(-0) = -0
	equal(MathLib.isNegZero(MathLib.floor(-0)), true, 'Spec. 3: MathLib.floor(-0) = -0');

	// Spec. 4: MathLib.floor(+∞) = +∞
	equal(MathLib.floor(+Infinity), +Infinity, 'Spec. 4: MathLib.floor(+∞) = +∞');

	// Spec. 5: MathLib.floor(-∞) = -∞
	equal(MathLib.floor(-Infinity), -Infinity, 'Spec. 5: MathLib.floor(-∞) = -∞');

	// Spec. 6: otherwise MathLib.floor(x) = ⎣x⎦
	equal(MathLib.floor(2.2), 2, 'Spec. 6: otherwise MathLib.floor(x) =  ⎣x⎦');
	equal(MathLib.floor(-2.2), -3, 'Spec. 6: otherwise MathLib.floor(x) = ⎣x⎦');
});