test('.cot()', 5, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).cot().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).cot().re));

	equal((new MathLib.Complex(0)).cot().re, Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).cot(), new MathLib.Complex(0.03279775553375259406, -0.98432922645819102947)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).cot(), new MathLib.Complex(0.00018758773798365922, -1.00064439247155908010)));
});