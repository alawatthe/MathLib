test('.isInvertible()', 2, function () {
	var m = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 2]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 9, 15]]);
	equal(m.isInvertible(), true, '.isInvertible(), invertible matrix');
	equal(n.isInvertible(), false, '.isInvertible(), singular matrix');
});