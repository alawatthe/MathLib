test('.cosh()', 4, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).cosh().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).cosh().re));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).cosh(), new MathLib.Complex(-0.64214812471551996484, 1.06860742138277833960)));

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
		ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).cosh(), new MathLib.Complex(-6.580663040551149, 7.581552742746537)));
	}
	else {
		ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).cosh(), new MathLib.Complex(-6.5806630405511564326, 7.5815527427465443537)));
	}
});