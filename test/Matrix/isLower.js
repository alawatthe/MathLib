test('.isLower()', 4, function () {
	var m = new MathLib.Matrix([[1, 0, 0], [4, 5, 0], [3, 0, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 5, 6]]),
			o = new MathLib.Matrix([[1, 0, 0], [4, 5, 0]]),
			p = new MathLib.Matrix([[1, 0, 0], [4, 5, 0], [4, 0, 6], [4, 3, 2]]);
	equal(m.isLower(), true, 'upper matrix');
	equal(n.isLower(), false, 'non upper matrix');
	equal(o.isLower(), true, 'upper matrix');
	equal(p.isLower(), true, 'upper matrix');
});