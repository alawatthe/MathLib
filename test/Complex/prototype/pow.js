test('.pow()', 29, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 7);

	// complex exponent
	ok(MathLib.isNaN(nan.pow(nan).re), 'ComplexNaN ^ ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(nan.pow(inf).re), 'ComplexNaN ^ ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(nan.pow(zero).re), 'ComplexNaN ^ 0 = ComplexNaN');
	ok(MathLib.isNaN(nan.pow(c).re), 'ComplexNaN ^ (2+5i) = ComplexNaN');

	ok(MathLib.isNaN(inf.pow(nan).re), 'ComplexInfinity ^ ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(inf.pow(inf).re), 'ComplexInfinity ^ ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(inf.pow(zero).re), 'ComplexInfinity ^ 0 = ComplexNaN');
	deepEqual(inf.pow(c), inf, 'ComplexInfinity ^ (2+5i) = ComplexInfinity');

	ok(MathLib.isNaN(zero.pow(nan).re), '0 ^ ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(zero.pow(inf).re), '0 ^ ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(zero.pow(zero).re), '0 ^ 0 = ComplexNaN');
	deepEqual(zero.pow(c), zero, '0 ^ (2+5i) = 0');

	ok(MathLib.isNaN(c.pow(nan).re), '(2+5i) ^ ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(c.pow(inf).re), '(2+5i) ^ ComplexInfinity = ComplexNaN');
	ok(c.pow(zero).isEqual(new MathLib.Complex(1)), '(2+5i) ^ 0 = 1');
	ok(c.pow(c).isEqual(new MathLib.Complex(-0.014751488748626422189, -0.074003984757716712413)), '(2+5i) ^ (2+5i) = -0.01475 -0.07400i');
	ok(c.pow(d).isEqual(new MathLib.Complex(-0.035288471617042692023, 0.012943638960390488567)));


	// number exponent
	equal(c.pow(0).re, 1, '(2+5i) ^ 0 = 1 + 0i');
	ok(MathLib.isPosZero(c.pow(0).im), '(2+5i) ^ 0 = 1 + 0i');

	equal(c.pow(-0).re, 1, '(2+5i) ^ -0 = 1 - 0i');
	ok(MathLib.isNegZero(c.pow(-0).im), '(2+5i) ^ -0 = 1 - 0i');


	ok(MathLib.isNaN(nan.pow(3).re), 'ComplexNaN ^ 3 = ComplexNaN');
	deepEqual(inf.pow(3), inf, 'ComplexInfinity ^ 3 = ComplexInfinity');
	deepEqual(zero.pow(3), zero, '0 ^ 3 = 0');


	ok(c.pow(3).isEqual(new MathLib.Complex(-142, -65)), '(2+5i) ^ 3 = -142 -65i');
	ok(c.pow(-3).isEqual(new MathLib.Complex(-0.0058222969371437943335,
		0.0026651359219320185329)), '(2+5i) ^ -3 = -0.0058223 + 0.00266514 i');

	// TODO: Fix the pow method and rewrite this test with .isEqual
	ok(Math.abs(c.pow(3.24).re + 176.64664988162751823) < 1e-12, '(2+5i) ^ 3.24 = -176.647 -153.359i');
	ok(Math.abs(c.pow(3.24).im + 153.35877082892785196) < 1e-12, '(2+5i) ^ 3.24 = -176.647 -153.359i');

	ok(c.pow(-3.24).isEqual(new MathLib.Complex(-0.0032280175872257475063,
		0.0028024579561675012682)), '(2+5i) ^ -3.24 = -0.00322802 + 0.00280246i');
});