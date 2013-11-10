test('.csch()', 5, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).csch().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).csch().re));

	equal((new MathLib.Complex(0)).csch().re, Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).csch(), new MathLib.Complex(-0.22150093085050939664, -0.63549379925389995364)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).csch(), new MathLib.Complex(0.064877471370635490483, 0.075489832915863699572)));
});