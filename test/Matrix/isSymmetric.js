test('.isSymmetric()', 2, function () {
	var c = new MathLib.Complex(4, 0),
			m = new MathLib.Matrix([[1, 7, c], [7, 0, 3], [4, 3, 1]]),
			n = new MathLib.Matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);
	equal(m.isSymmetric(), true, 'symmetric matrix');
	equal(n.isSymmetric(), false, 'non symmetric matrix');
});