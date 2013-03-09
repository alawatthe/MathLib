test('.toLaTeX()', 7, function () {
	equal(MathLib.sin.toLaTeX(), '\\sin(x)', 'MathLib.sin.toLaTeX() should be sin(x)');
	equal(MathLib.sin.toLaTeX('z'), '\\sin(z)', 'custom bound variable');
	equal(MathLib.exp(MathLib.sin).toLaTeX(), '\\exp(\\sin(x))', 'MathLib.exp(MathLib.sin).toLaTeX() should be exp(sin(x))');
	// equal(MathLib.pow(MathLib.sin, 2).toLaTeX(), 'sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toLaTeX() = sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toLaTeX(), '\\sin(x)+2', 'MathLib.plus(MathLib.sin, 2).toLaTeX() = sin(x)+2');
	equal(MathLib.plus(2, MathLib.sin).toLaTeX(), '2+\\sin(x)', 'MathLib.plus(2, MathLib.sin).toLaTeX() = 2+sin(x)');
	equal(MathLib.times(2, MathLib.sin).toLaTeX(), '2*\\sin(x)', 'MathLib.times(2, MathLib.sin).toLaTeX() = 2*sin(x)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX(), '\\sin(x)+\\cos(x)', 'MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX() = sin(x)+cos(x)');
});