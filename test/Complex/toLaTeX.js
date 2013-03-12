test('.toLaTeX()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toLaTeX(), '3+4i', 'Normal complex number.');
	equal(d.toLaTeX(), '7i', 'Real part is zero.');
	equal(e.toLaTeX(), '4', 'Complex part is zero.');
	equal(f.toLaTeX(), '4-5i', 'Complex part is negative.');
	equal(g.toLaTeX(), '0', 'Number is zero.');
});