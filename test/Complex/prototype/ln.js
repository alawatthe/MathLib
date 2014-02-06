test('.ln()', 4, function () {
	var c = new MathLib.Complex(3, 4),
			res = new MathLib.Complex(1.6094379124341003, 0.9272952180016123);

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).ln().re));
	equal((new MathLib.Complex(Infinity)).ln().re, Infinity);

	equal((new MathLib.Complex(0)).ln().re, Infinity);

	equal(MathLib.isEqual(c.ln(), res), true, 'natural logarithm of the complex number');
});