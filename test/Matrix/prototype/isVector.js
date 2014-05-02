test('.isVector()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 2, 3]]);
	equal(m.isVector(), false, 'normal matrix');
	equal(n.isVector(), true, 'one row matrix');
});