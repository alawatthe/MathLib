test('.toLaTeX()', 22, function () {
	equal(MathLib.toLaTeX([1, 2, [3, 4], new MathLib.Rational(1, 2)]), '[1,2,[3,4],\\frac{1}{2}]');

	equal(MathLib.toLaTeX(NaN), '\\text{ NaN }');
	equal(MathLib.toLaTeX(Infinity), '\\infty');
	equal(MathLib.toLaTeX(-Infinity), '-\\infty');

	equal(MathLib.toLaTeX(123), '123');
	equal(MathLib.toLaTeX(-123), '-123');

	equal(MathLib.toLaTeX(123, {sign: true}), '+123');
	equal(MathLib.toLaTeX(-123, {sign: true}), '-123');

	equal(MathLib.toLaTeX(123, {base: 2}), '1111011');
	equal(MathLib.toLaTeX(-123, {base: 2}), '-1111011');
	equal(MathLib.toLaTeX(123, {base: 2, sign: true}), '+1111011');
	equal(MathLib.toLaTeX(-123, {base: 2, sign: true}), '-1111011');

	equal(MathLib.toLaTeX(123, {base: 2, baseSubscript: true}), '1111011_{2}');
	equal(MathLib.toLaTeX(-123, {base: 2, baseSubscript: true}), '-1111011_{2}');

	equal(MathLib.toLaTeX(123, {base: 2, baseSubscript: true, sign: true}), '+1111011_{2}');
	equal(MathLib.toLaTeX(-123, {base: 2, baseSubscript: true, sign: true}), '-1111011_{2}');

	equal(MathLib.toLaTeX(true), '\\text{ true }');
	equal(MathLib.toLaTeX(false), '\\text{ false }');
	equal(MathLib.toLaTeX('MathLib'), '\\texttt{"MathLib"}');
	equal(MathLib.toLaTeX('MathLib', {quotes: ['\'', '\'']}), '{\\ttfamily\\char\'15}\\texttt{MathLib}{\\ttfamily\\char\'15}');
	equal(MathLib.toLaTeX('# $ % ^ & _ { } ~ \\'), '\\texttt{"\\# \\$ \\% \\^{} \\& \\_ \\{ \\} \\~{} \\textbackslash{}"}');

	equal(MathLib.toLaTeX(new MathLib.Rational(1, 2)), '\\frac{1}{2}');
});