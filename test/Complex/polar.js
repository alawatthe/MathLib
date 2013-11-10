test('.polar()', 8, function () {
	equal(new MathLib.Complex.polar(Infinity).re, Infinity);
	equal(new MathLib.Complex.polar(Infinity, NaN).re, Infinity);
	equal(new MathLib.Complex.polar(Infinity, Infinity).re, Infinity);
	equal(new MathLib.Complex.polar(Infinity, 0).re, Infinity);

	ok(MathLib.isPosZero(new MathLib.Complex.polar(1, +0).im));
	ok(MathLib.isNegZero(new MathLib.Complex.polar(1, -0).im));
	ok(MathLib.isEqual(new MathLib.Complex.polar(2, 3), new MathLib.Complex(-1.9799849932008909145, 0.2822400161197344442)));
	ok(MathLib.isEqual(new MathLib.Complex.polar(4, -5), new MathLib.Complex(1.1346487418529050579, 3.8356970986525538756)));
});