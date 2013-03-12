test('.times()', 3, function () {
	var c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 7),
			r = new MathLib.Rational(2, 3);
	equal(c.times(3).isEqual(new MathLib.Complex(6, 15)), true, 'Multiplying by a normal number.');
	equal(c.times(d).isEqual(new MathLib.Complex(-29, 29)), true, 'Multiplying by a complex number.');
	equal(c.times(r).isEqual(new MathLib.Complex(4 / 3, 10 / 3)), true, 'Multiplying by a rational number.');
});