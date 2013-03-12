test('.abs()', 2, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(0, 0);

	equal(MathLib.isEqual(c1.abs(), 5), true, 'Absolut value of a complex number');
	equal(MathLib.isEqual(c2.abs(), 0), true, 'Absolut value of a complex number');
});