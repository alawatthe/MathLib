test('.isOne()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(1, 0);
	equal(c.isOne(), false, '3+4i');
	equal(d.isOne(), true, 'complex one');
});