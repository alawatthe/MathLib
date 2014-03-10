test('.degToRad()', 7, function () {
	// Spec. 1: MathLib.degToRad(NaN) = NaN
	equal(MathLib.isNaN(MathLib.degToRad(NaN)), true, 'Spec. 1: MathLib.degToRad(NaN) = NaN');

	// Spec. 2: MathLib.degToRad(+0) = +0
	equal(MathLib.isPosZero(MathLib.degToRad(+0)), true, 'Spec. 2: MathLib.degToRad(+0) = +0');

	// Spec. 3: MathLib.degToRad(-0) = -0
	equal(MathLib.isNegZero(MathLib.degToRad(-0)), true, 'Spec. 3: MathLib.degToRad(-0) = -0');

	// Spec. 4: MathLib.degToRad(+∞) = +∞
	equal(MathLib.degToRad(+Infinity), Infinity, 'Spec. 4: MathLib.degToRad(+∞) = +∞');

	// Spec. 5: MathLib.degToRad(-∞) = -∞
	equal(MathLib.degToRad(-Infinity), -Infinity, 'Spec. 5: MathLib.degToRad(-∞) = -∞');

	// Spec. 6: otherwise MathLib.degToRad(x) = x * π/180
	equal(MathLib.degToRad(90), Math.PI / 2, 'Spec. 6: otherwise MathLib.degToRad(x) = x * π/180');
	equal(MathLib.degToRad(180), Math.PI, 'Spec. 6: otherwise MathLib.degToRad(x) = x * π/180');
});