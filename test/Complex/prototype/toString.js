test('.toString()', 22, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(-3, 4),
			c3 = new MathLib.Complex(3, -4),
			c4 = new MathLib.Complex(-3, -4),
			d1 = new MathLib.Complex(0, 7),
			d2 = new MathLib.Complex(0, -7),
			e1 = new MathLib.Complex(4, 0),
			e2 = new MathLib.Complex(-4, 0),
			f = new MathLib.Complex(0, 0);

	equal((new MathLib.Complex(NaN)).toString(), 'ComplexNaN');
	equal((new MathLib.Complex(NaN)).toString({sign: true}), '+ComplexNaN');
	equal((new MathLib.Complex(Infinity)).toString(), 'ComplexInfinity');
	equal((new MathLib.Complex(Infinity)).toString({sign: true}), '+ComplexInfinity');

	equal(c1.toString(), '3+4i', 'Normal complex number.');
	equal(c1.toString({sign: true}), '+3+4i', 'Normal complex number.');

	equal(c2.toString(), '-3+4i', 'Normal complex number.');
	equal(c2.toString({sign: true}), '-3+4i', 'Normal complex number.');

	equal(c3.toString(), '3-4i', 'Normal complex number.');
	equal(c3.toString({sign: true}), '+3-4i', 'Normal complex number.');

	equal(c4.toString(), '-3-4i', 'Normal complex number.');
	equal(c4.toString({sign: true}), '-3-4i', 'Normal complex number.');

	equal(d1.toString(), '7i', 'Real part is zero.');
	equal(d1.toString({sign: true}), '+7i', 'Real part is zero.');

	equal(d2.toString(), '-7i', 'Real part is zero.');
	equal(d2.toString({sign: true}), '-7i', 'Real part is zero.');

	equal(e1.toString(), '4', 'Complex part is zero.');
	equal(e1.toString({sign: true}), '+4', 'Complex part is zero.');
	equal(e2.toString(), '-4', 'Complex part is zero.');
	equal(e2.toString({sign: true}), '-4', 'Complex part is zero.');

	equal(f.toString(), '0', 'Number is zero.');
	equal(f.toString({sign: true}), '+0', 'Number is zero.');
});