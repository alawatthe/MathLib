test('.toLaTeX()', 22, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(-3, 4),
			c3 = new MathLib.Complex(3, -4),
			c4 = new MathLib.Complex(-3, -4),
			d1 = new MathLib.Complex(0, 7),
			d2 = new MathLib.Complex(0, -7),
			e1 = new MathLib.Complex(4, 0),
			e2 = new MathLib.Complex(-4, 0),
			f = new MathLib.Complex(0, 0);

	equal((new MathLib.Complex(NaN)).toLaTeX(), '\\text{ComplexNaN}');
	equal((new MathLib.Complex(NaN)).toLaTeX({sign: true}), '+\\text{ComplexNaN}');
	equal((new MathLib.Complex(Infinity)).toLaTeX(), '\\text{ComplexInfinity}');
	equal((new MathLib.Complex(Infinity)).toLaTeX({sign: true}), '+\\text{ComplexInfinity}');

	equal(c1.toLaTeX(), '3+4i', 'Normal complex number.');
	equal(c1.toLaTeX({sign: true}), '+3+4i', 'Normal complex number.');

	equal(c2.toLaTeX(), '-3+4i', 'Normal complex number.');
	equal(c2.toLaTeX({sign: true}), '-3+4i', 'Normal complex number.');

	equal(c3.toLaTeX(), '3-4i', 'Normal complex number.');
	equal(c3.toLaTeX({sign: true}), '+3-4i', 'Normal complex number.');

	equal(c4.toLaTeX(), '-3-4i', 'Normal complex number.');
	equal(c4.toLaTeX({sign: true}), '-3-4i', 'Normal complex number.');

	equal(d1.toLaTeX(), '7i', 'Real part is zero.');
	equal(d1.toLaTeX({sign: true}), '+7i', 'Real part is zero.');

	equal(d2.toLaTeX(), '-7i', 'Real part is zero.');
	equal(d2.toLaTeX({sign: true}), '-7i', 'Real part is zero.');

	equal(e1.toLaTeX(), '4', 'Complex part is zero.');
	equal(e1.toLaTeX({sign: true}), '+4', 'Complex part is zero.');
	equal(e2.toLaTeX(), '-4', 'Complex part is zero.');
	equal(e2.toLaTeX({sign: true}), '-4', 'Complex part is zero.');

	equal(f.toLaTeX(), '0', 'Number is zero.');
	equal(f.toLaTeX({sign: true}), '+0', 'Number is zero.');
});