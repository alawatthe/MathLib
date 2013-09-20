test('.isParallelTo()', 3, function () {
	var l1 = new MathLib.Line([3, 2, 1]),
			l2 = new MathLib.Line([3, 2, 2]),
			l3 = new MathLib.Line([6, 4, 1]),
			l4 = new MathLib.Line([1, 4, 1]);

	equal(l1.isParallelTo(l2), true, '.isParallelTo()');
	equal(l1.isParallelTo(l3), true, '.isParallelTo()');
	equal(l1.isParallelTo(l4), false, '.isParallelTo()');
});