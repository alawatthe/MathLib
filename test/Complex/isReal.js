test('.isReal()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(3, 0);
	equal(c.isReal(), false, '3+4i');
	equal(d.isReal(), true, '3+0i');
});