test('.isSquare()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8]]);
	equal(m.isSquare(), true, 'square matrix');
	equal(n.isSquare(), false, 'non square matrix');
});