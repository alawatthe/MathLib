test('.isDiag()', 2, function () {
	var c = new MathLib.Complex(0, 0),
			m = new MathLib.Matrix([[1, 0, 0], [0, 5, c], [0, 0, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
	equal(m.isDiag(), true, 'square matrix');
	equal(n.isDiag(), false, 'non square matrix');
});