test('.radToDeg()', 7, function () {
	// Spec. 1: MathLib.radToDeg(NaN) = NaN
	equal(MathLib.isNaN(MathLib.radToDeg(NaN)), true, 'Spec. 1: MathLib.radToDeg(NaN) = NaN');

	// Spec. 2: MathLib.radToDeg(+0) = +0
	equal(MathLib.isPosZero(MathLib.radToDeg(+0)), true, 'Spec. 2: MathLib.radToDeg(+0) = +0');

	// Spec. 3: MathLib.radToDeg(-0) = -0
	equal(MathLib.isNegZero(MathLib.radToDeg(-0)), true, 'Spec. 3: MathLib.radToDeg(-0) = -0');

	// Spec. 4: MathLib.radToDeg(+&infin;) = +&infin;
	equal(MathLib.radToDeg(+Infinity), Infinity, 'Spec. 4: MathLib.radToDeg(+&infin;) = +&infin;');

	// Spec. 5: MathLib.radToDeg(-&infin;) = -&infin;
	equal(MathLib.radToDeg(-Infinity), -Infinity, 'Spec. 5: MathLib.radToDeg(-&infin;) = -&infin;');

	// Spec. 6: otherwise MathLib.radToDeg(x) = x * 180/π
	equal(MathLib.radToDeg(Math.PI / 2), 90, 'Spec. 6: otherwise MathLib.radToDeg(x) = x * π/180');
	equal(MathLib.radToDeg(Math.PI), 180, 'Spec. 6: otherwise MathLib.radToDeg(x) = x * π/180');
});