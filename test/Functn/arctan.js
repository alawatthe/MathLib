test('.arctan()', 7, function () {
	// Spec. 1: MathLib.arctan(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arctan(NaN)), true, 'Spec. 1: MathLib.arctan(NaN) = NaN');

	// Spec. 2: MathLib.arctan(+0) = +0
	equal(MathLib.isPosZero(MathLib.arctan(+0)), true, 'Spec. 2: MathLib.arctan(+0) = +0');

	// Spec. 3: MathLib.arctan(-0) = -0
	equal(MathLib.isNegZero(MathLib.arctan(-0)), true, 'Spec. 3: MathLib.arctan(-0) = -0');

	// Spec. 4: MathLib.arctan(+∞) = +π/2
	equal(MathLib.arctan(+Infinity), +Math.PI / 2, 'Spec. 4: MathLib.arctan(+∞) = +π/2');

	// Spec. 5: MathLib.arctan(-∞) = -π/2
	equal(MathLib.arctan(-Infinity), -Math.PI / 2, 'Spec. 5: MathLib.arctan(-∞) = -π/2');

	// Spec. 6: otherwise MathLib.arctan(x) = inverse tangent of x
	equal(MathLib.arctan(1), Math.PI / 4, 'Spec. 6: otherwise MathLib.arctan(x) = inverse tangent of x');
	equal(MathLib.arctan(-1), -Math.PI / 4, 'Spec. 6: otherwise MathLib.arctan(x) = inverse tangent of x');
});