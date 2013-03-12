test('.toLaTeX()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toLaTeX(), '3x^{2}+2x+1', '.toLaTeX()');
	deepEqual(q.toLaTeX(), '1x^{2}-1', '.toLaTeX()');
});