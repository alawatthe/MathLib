test('.ln()', 1, function () {
	var c = new MathLib.Complex(3, 4),
			res = new MathLib.Complex(1.6094379124341003, 0.9272952180016123);
	equal(MathLib.isEqual(c.ln(), res), true, 'natural logarithm of the complex number');
});