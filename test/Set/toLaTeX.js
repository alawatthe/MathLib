test('.toLaTeX()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toLaTeX(), '\\{2, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (set)');
	equal(e.toLaTeX(), '\\emptyset', 'Testing .toLaTeX() (empty set)');
});