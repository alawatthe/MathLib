test('.cot()', 7, function () {
	// Spec. 1: MathLib.cot(NaN) = NaN
	equal(MathLib.isNaN(MathLib.cot(NaN)), true, 'Spec. 1: MathLib.cot(NaN) = NaN');

	// Spec. 2: MathLib.cot(+0) = +&infin;
	equal(MathLib.cot(+0), Infinity, 'Spec. 2: MathLib.cot(+0) = +&infin;');

	// Spec. 3: MathLib.cot(-0) = -&infin;
	equal(MathLib.cot(-0), -Infinity, 'Spec. 3: MathLib.cot(-0) = -&infin;');

	// Spec. 4: MathLib.cot(+&infin;) = NaN
	equal(MathLib.isNaN(MathLib.cot(+Infinity)), true, 'Spec. 4: MathLib.cot(+&infin;) = NaN');

	// Spec. 5: MathLib.cot(-&infin;) = NaN
	equal(MathLib.isNaN(MathLib.cot(-Infinity)), true, 'Spec. 5: MathLib.cot(-&infin;) = NaN');

	// Spec. 6: otherwise MathLib.cot(x) = cotangent of x
	equal(MathLib.cot(Math.PI / 3), 1 / Math.sqrt(3), 'Spec. 6: otherwise MathLib.cot(x) = cotangent of x');
	equal(MathLib.cot(Math.PI / 2), 0, 'Spec. 6: otherwise MathLib.cot(x) = cotangent of x');
});