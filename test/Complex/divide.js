test('.divide()', 2, function () {
	var c = new MathLib.Complex(3, 6),
			d = new MathLib.Complex(2, 5),
			e = new MathLib.Complex(3, 7);
	deepEqual(c.divide(3), new MathLib.Complex(1, 2), 'Dividing by a normal number.');
	ok(d.divide(e).isEqual(new MathLib.Complex(41 / 58, 1 / 58)), 'Dividing by a complex number.');
});