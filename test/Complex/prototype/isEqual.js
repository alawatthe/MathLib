test('.isEqual()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(3, 4),
			e = new MathLib.Complex(5, 3);

	equal(c.isEqual(d), true, 'equal number');
	equal(d.isEqual(e), false, 'different number');
});