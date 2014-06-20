test('.toLaTeX()', 26, function () {
	equal(MathLib.abs.toLaTeX(), 'x \\longmapsto \\left|x\\right|');
	equal(MathLib.arctan2.toLaTeX(), '\\left(x, y\\right) \\longmapsto \\operatorname{arctan2}\\left(x, y\\right)');
	equal(MathLib.binomial.toLaTeX(), '\\left(n, k\\right) \\longmapsto {n \\choose k}');
	equal(MathLib.cbrt.toLaTeX(), 'x \\longmapsto \\sqrt[3]{x}');
	equal(MathLib.conjugate.toLaTeX(), 'x \\longmapsto \\overline{x}');
	equal(MathLib.degToRad.toLaTeX(), 'x \\longmapsto \\frac{\\pi}{180}x');
	equal(MathLib.equivalent.toLaTeX(), '\\left(x, y\\right) \\longmapsto x \\Leftrightarrow y');
	equal(MathLib.exp.toLaTeX(), 'x \\longmapsto e^{x}');
	equal(MathLib.factorial.toLaTeX(), 'n \\longmapsto n!');
	equal(MathLib.implies.toLaTeX(), '\\left(x, y\\right) \\longmapsto x \\Rightarrow y');
	equal(MathLib.inverse.toLaTeX(), 'x \\longmapsto \\frac{1}{x}');
	equal(MathLib.lg.toLaTeX(), 'x \\longmapsto \\lg\\left(x\\right)');
	equal(MathLib.log.toLaTeX(), '\\left(b, x\\right) \\longmapsto \\log_{b}\\left(x\\right)');
	equal(MathLib.logGamma.toLaTeX(), 'x \\longmapsto \\log\\left(\\Gamma\\left(x\\right)\\right)');
	equal(MathLib.mod.toLaTeX(), '\\left(n, m\\right) \\longmapsto n \\mod m');
	equal(MathLib.negative.toLaTeX(), 'x \\longmapsto -x');
	equal(MathLib.pow.toLaTeX(), '\\left(x, y\\right) \\longmapsto \\left(x\\right)^{y}');
	equal(MathLib.rem.toLaTeX(), '\\left(n, m\\right) \\longmapsto n \\operatorname{rem} m');
	equal(MathLib.root.toLaTeX(), '\\left(x, y\\right) \\longmapsto \\left(x\\right)^{\\frac{1}{y}}');
	equal(MathLib.sin.toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)');
	equal(MathLib.sqrt.toLaTeX(), 'x \\longmapsto \\sqrt{x}');

	equal(MathLib.exp(MathLib.sin).toLaTeX(), 'x \\longmapsto e^{\\sin\\left(x\\right)}',
		'MathLib.exp(MathLib.sin).toLaTeX() should be x \\longmapsto e^{\\sin\\left(x\\right)}');
	// equal(MathLib.pow(MathLib.sin, 2).toLaTeX(), 'x \\longmapsto sin(x)^2',
	// 'MathLib.pow(MathLib.sin, 2).toLaTeX() = x \\longmapsto sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)+2',
		'MathLib.plus(MathLib.sin, 2).toLaTeX() = x \\longmapsto \\sin\\left(x\\right)+2');
	equal(MathLib.plus(2, MathLib.sin).toLaTeX(), 'x \\longmapsto 2+\\sin\\left(x\\right)',
		'MathLib.plus(2, MathLib.sin).toLaTeX() = x \\longmapsto 2+\\sin\\left(x\\right)');
	equal(MathLib.times(2, MathLib.sin).toLaTeX(), 'x \\longmapsto 2\\cdot\\sin\\left(x\\right)',
		'MathLib.times(2, MathLib.sin).toLaTeX() = x \\longmapsto 2\\cdot\\sin\\left(x\\right)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)' +
		'+\\cos\\left(x\\right)', 'MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX() = x \\longmapsto' +
		' \\sin\\left(x\\right)+\\cos\\left(x\\right)');
});