test('.toLaTeX()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.toLaTeX(), '\\begin{pmatrix}\n\t1\\\\\n\t2\\\\\n\t3\n\\end{pmatrix}');
});