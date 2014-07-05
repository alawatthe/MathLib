test('.polar()', 8, function () {
	equal(MathLib.Complex.polar(Infinity).re, Infinity);
	equal(MathLib.Complex.polar(Infinity, NaN).re, Infinity);
	equal(MathLib.Complex.polar(Infinity, Infinity).re, Infinity);
	equal(MathLib.Complex.polar(Infinity, 0).re, Infinity);

	ok(MathLib.isPosZero(MathLib.Complex.polar(1, +0).im));
	ok(MathLib.isNegZero(MathLib.Complex.polar(1, -0).im));
	ok(MathLib.isEqual(MathLib.Complex.polar(2, 3), new MathLib.Complex(-1.9799849932008909145, 0.2822400161197344442)));

	// Chrome implemented sin, cos & tan in a new way:
	// https://codereview.chromium.org/70003004/
	// While the new implementation is faster, it is also not acurate.
	// I expect the bug to be fixed soon and it isn't causing major problems,
	// I will only modify the test now and not the code.
	// Affected tests:
	// Complex.polar, Complex#cosh, Complex#sinh
	//
	// More information:
	// https://code.google.com/p/v8/issues/detail?id=3006
	if (Math.cos(-5) === 0.2836621854632259) {
		ok(MathLib.isEqual(MathLib.Complex.polar(4, -5), new MathLib.Complex(1.1346487418529037, 3.835697098652549)));
	}
	else {
		ok(MathLib.isEqual(MathLib.Complex.polar(4, -5), new MathLib.Complex(1.1346487418529050579, 3.8356970986525538756)));
	}
});