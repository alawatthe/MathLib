test('.divide()', 18, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 6),
			e = new MathLib.Complex(3, 7);

	deepEqual(nan.divide(nan), nan, 'ComplexNaN / ComplexNaN = ComplexNaN');
	deepEqual(nan.divide(inf), nan, 'ComplexNaN / ComplexInfinity = ComplexNaN');
	deepEqual(nan.divide(zero), nan, 'ComplexNaN / 0 = ComplexNaN');
	deepEqual(nan.divide(c), nan, 'ComplexNaN / (2+5i) = ComplexNaN');

	deepEqual(inf.divide(nan), nan, 'ComplexInfinity / ComplexNaN = ComplexNaN');
	deepEqual(inf.divide(inf), nan, 'ComplexInfinity / ComplexInfinity = ComplexNaN');
	deepEqual(inf.divide(zero), inf, 'ComplexInfinity / 0 = ComplexInfinity');
	deepEqual(inf.divide(c), inf, 'ComplexInfinity / (2+5i) = ComplexInfinity');

	deepEqual(zero.divide(nan), nan, '0 / ComplexNaN = ComplexNaN');
	deepEqual(zero.divide(inf), zero, '0 / ComplexInfinity = 0');
	deepEqual(zero.divide(zero), nan, '0 / 0 = ComplexNaN');
	deepEqual(zero.divide(c), zero, '0 / (2+5i) = 0');

	deepEqual(c.divide(nan), nan, '(2+5i) / ComplexNaN = ComplexNaN');
	deepEqual(c.divide(inf), zero, '(2+5i) / ComplexInfinity = 0');
	deepEqual(c.divide(zero), inf, '(2+5i) / 0 = ComplexInfinity');
	deepEqual(c.divide(c), new MathLib.Complex(1), '(2+5i) / (2+5i) = 1');

	deepEqual(d.divide(3), new MathLib.Complex(1, 2), 'Dividing by a normal number.');
	ok(c.divide(e).isEqual(new MathLib.Complex(41 / 58, 1 / 58)), 'Dividing by a complex number.');
});