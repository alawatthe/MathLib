test('.toString()', 7, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);

	equal((new MathLib.Complex(NaN)).toString(), 'ComplexNaN');
	equal((new MathLib.Complex(Infinity)).toString(), 'ComplexInfinity');

	equal(c.toString(), '3+4i', 'Normal complex number.');
	equal(d.toString(), '7i', 'Real part is zero.');
	equal(e.toString(), '4', 'Complex part is zero.');
	equal(f.toString(), '4-5i', 'Complex part is negative.');
	equal(g.toString(), '0', 'Number is zero.');
});