test('.prototype.toLaTeX()', 8, function () {
	var r = new MathLib.Rational(2, 3),
			p = new MathLib.Rational(-2, 3);

	equal(r.toLaTeX(), '\\frac{2}{3}', '.toLaTeX()');
	equal(r.toLaTeX({sign: true}), '+\\frac{2}{3}', '.toLaTeX()');
	equal(r.toLaTeX({base: 2}), '\\frac{10}{11}', '.toLaTeX()');
	equal(r.toLaTeX({base: 2, baseSubscript: true}), '\\frac{10_{2}}{11_{2}}', '.toLaTeX()');

	equal(p.toLaTeX(), '\\frac{-2}{3}', '.toLaTeX()');
	equal(p.toLaTeX({sign: true}), '-\\frac{2}{3}', '.toLaTeX()');
	equal(p.toLaTeX({base: 2}), '\\frac{-10}{11}', '.toLaTeX()');
	equal(p.toLaTeX({base: 2, baseSubscript: true}), '\\frac{-10_{2}}{11_{2}}', '.toLaTeX()');
});