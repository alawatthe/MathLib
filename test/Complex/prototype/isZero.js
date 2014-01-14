test('.isZero()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 0);
	equal(c.isZero(), false, 'non zero complex');
	equal(d.isZero(), true, 'complex zero');
});