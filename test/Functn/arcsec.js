test('.arcsec()', 9, function () {
	// Spec. 1: MathLib.arcsec(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arcsec(NaN)), true, 'Spec. 1: MathLib.arcsec(NaN) = NaN');

	// Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)
	equal(MathLib.isNaN(MathLib.arcsec(+0)), true, 'Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)');
	equal(MathLib.isNaN(MathLib.arcsec(-0)), true, 'Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)');
	equal(MathLib.isNaN(MathLib.arcsec(0.5)), true, 'Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)');

	// Spec. 3: MathLib.arcsec(+∞) = π/2
	equal(MathLib.arcsec(+Infinity), Math.PI / 2, 'Spec. 3: MathLib.arcsec(+∞) = π/2');

	// Spec. 4: MathLib.arcsec(-∞) = π/2
	equal(MathLib.arcsec(-Infinity), Math.PI / 2, 'Spec. 4: MathLib.arcsec(-∞) = π/2');

	// Spec. 5: MathLib.arcsec(1) = +0
	equal(MathLib.isPosZero(MathLib.arcsec(1)), true, 'Spec. 5: otherwise MathLib.arcsec(1) = +0');

	// Spec. 6: otherwise MathLib.arcsec(x) = inverse secant of x
	equal(MathLib.arcsec(-1), Math.PI, 'Spec. 6: otherwise MathLib.arcsec(x) = inverse secant of x');
	equal(MathLib.arcsec(10), 1.4706289056333368, 'Spec. 6: otherwise MathLib.arcsec(x) = inverse secant of x');
});