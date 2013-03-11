test('.toLaTeX()', 1, function () {
	var p = new MathLib.Point(1, 2),
			c = new MathLib.Circle(p, 2);

	equal(c.toLaTeX(), 'B_{2}\\left(\\begin{pmatrix}1\\\\2\\end{pmatrix}\\right)', 'Spec. 1: ');
});