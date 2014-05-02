test('.toLaTeX()', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);

	equal(line.toLaTeX(), '\\begin{pmatrix}\n\t3\\\\\n\t2\\\\\n\t1\n\\end{pmatrix}', '.toLaTeX()');
});