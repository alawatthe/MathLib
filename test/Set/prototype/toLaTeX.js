test('.toLaTeX()', 3, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();

	equal(s.toLaTeX(), '\\left{2, 3, 4, 8, 9\\right}', 'Testing .toLaTeX() (set)');
	equal(s.toLaTeX({base: 2}), '\\left{10, 11, 100, 1000, 1001\\right}', 'Testing .toLaTeX() (set)');
	equal(e.toLaTeX(), '\\emptyset', 'Testing .toLaTeX() (empty set)');
});
