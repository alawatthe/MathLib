test('.divide()', 18, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 6),
			e = new MathLib.Complex(3, 7);

	ok(MathLib.isNaN(nan.divide(nan).re), 'ComplexNaN / ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(nan.divide(inf).re), 'ComplexNaN / ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(nan.divide(zero).re), 'ComplexNaN / 0 = ComplexNaN');
	ok(MathLib.isNaN(nan.divide(c).re), 'ComplexNaN / (2+5i) = ComplexNaN');

	ok(MathLib.isNaN(inf.divide(nan).re), 'ComplexInfinity / ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(inf.divide(inf).re), 'ComplexInfinity / ComplexInfinity = ComplexNaN');
	deepEqual(inf.divide(zero), inf, 'ComplexInfinity / 0 = ComplexInfinity');
	deepEqual(inf.divide(c), inf, 'ComplexInfinity / (2+5i) = ComplexInfinity');

	ok(MathLib.isNaN(zero.divide(nan).re), '0 / ComplexNaN = ComplexNaN');
	deepEqual(zero.divide(inf), zero, '0 / ComplexInfinity = 0');
	ok(MathLib.isNaN(zero.divide(zero).re), '0 / 0 = ComplexNaN');
	deepEqual(zero.divide(c), zero, '0 / (2+5i) = 0');

	ok(MathLib.isNaN(c.divide(nan).re), '(2+5i) / ComplexNaN = ComplexNaN');
	deepEqual(c.divide(inf), zero, '(2+5i) / ComplexInfinity = 0');
	deepEqual(c.divide(zero), inf, '(2+5i) / 0 = ComplexInfinity');
	deepEqual(c.divide(c), new MathLib.Complex(1), '(2+5i) / (2+5i) = 1');

	deepEqual(d.divide(3), new MathLib.Complex(1, 2), 'Dividing by a normal number.');
	ok(c.divide(e).isEqual(new MathLib.Complex(41 / 58, 1 / 58)), 'Dividing by a complex number.');
});