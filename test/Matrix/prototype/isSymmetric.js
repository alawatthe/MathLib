test('.isSymmetric()', 4, function () {
	var c = new MathLib.Complex(4, 0),
			m = new MathLib.Matrix([[1, 7, c], [7, 0, 3], [4, 3, 1]]),
			n = new MathLib.Matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]),
			o = new MathLib.Matrix([[1, 0, 0], [0, 1, 0]]);

	equal(m.isSymmetric(), true, 'symmetric matrix');
	equal(m.isSymmetric(), true, 'isSymmetric should be cached');
	equal(n.isSymmetric(), false, 'non symmetric matrix');
	equal(o.isSymmetric(), false, 'non square matrix');
});