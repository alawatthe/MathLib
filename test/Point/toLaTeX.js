test('.toLaTeX()', 2, function () {
	var point = new MathLib.Point([3, 2, 1]);

	equal(point.toLaTeX(), '\\begin{pmatrix}3\\\\2\\end{pmatrix}', '.toLaTeX()');
	equal(point.toLaTeX(true), '\\begin{pmatrix}3\\\\2\\\\1\\end{pmatrix}', '.toLaTeX()');
});