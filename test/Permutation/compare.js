test('.compare()', 3, function () {
	var p1 = new MathLib.Permutation([1, 2]),
			p2 = new MathLib.Permutation([1, 2, 3]),
			p3 = new MathLib.Permutation([1, 2, 3]),
			p4 = new MathLib.Permutation([1, 2, 1]);

	equal(p1.compare(p2), -1);
	equal(p2.compare(p3), 0);
	equal(p3.compare(p4), 1);
});