test('.toLaTeX()', 6, function () {
	equal(MathLib.sin.toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)', 'MathLib.sin.toLaTeX() should be x \\longmapsto \\sin\\left(x)');
	equal(MathLib.exp(MathLib.sin).toLaTeX(), 'x \\longmapsto e^{\\sin\\left(x\\right)}', 'MathLib.exp(MathLib.sin).toLaTeX() should be x \\longmapsto e^{\\sin\\left(x\\right)}');
	// equal(MathLib.pow(MathLib.sin, 2).toLaTeX(), 'x \\longmapsto sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toLaTeX() = x \\longmapsto sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)+2', 'MathLib.plus(MathLib.sin, 2).toLaTeX() = x \\longmapsto \\sin\\left(x\\right)+2');
	equal(MathLib.plus(2, MathLib.sin).toLaTeX(), 'x \\longmapsto 2+\\sin\\left(x\\right)', 'MathLib.plus(2, MathLib.sin).toLaTeX() = x \\longmapsto 2+\\sin\\left(x\\right)');
	equal(MathLib.times(2, MathLib.sin).toLaTeX(), 'x \\longmapsto 2\\cdot\\sin\\left(x\\right)', 'MathLib.times(2, MathLib.sin).toLaTeX() = x \\longmapsto 2\\cdot\\sin\\left(x\\right)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)+\\cos\\left(x\\right)', 'MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX() = x \\longmapsto \\sin\\left(x\\right)+\\cos\\left(x\\right)');
});