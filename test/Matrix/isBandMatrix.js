test('.isBandMatrix()', 3, function () {
	var m = new MathLib.Matrix([[2, 1, 3, 0], [1, 2, 1, 3], [0, 1, 2, 1], [0, 0, 1, 2]]);

	equal(m.isBandMatrix(1, 2), true, 'band matrix');
	equal(m.isBandMatrix(2), true, 'band matrix');
	equal(m.isBandMatrix(1, 1), false, 'upper bandwidth to small');
});