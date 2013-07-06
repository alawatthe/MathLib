test('.isUpper()', 4, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [0, 5, 6], [0, 0, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 5, 6]]),
			o = new MathLib.Matrix([[1, 4, 7], [0, 5, 8]]),
			p = new MathLib.Matrix([[1, 4, 7], [0, 5, 8], [0, 0, 6], [0, 0, 0]]);
	equal(m.isUpper(), true, 'upper matrix');
	equal(n.isUpper(), false, 'non upper matrix');
	equal(o.isUpper(), true, 'upper matrix');
	equal(p.isUpper(), true, 'upper matrix');
});