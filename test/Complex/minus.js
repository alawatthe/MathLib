test('.minus()', 1, function () {
	var c = new MathLib.Complex(3, -4),
			d = new MathLib.Complex(7, -8);
	deepEqual(c.minus(d), new MathLib.Complex(-4, 4), 'Checking the negative of a complex number');
});