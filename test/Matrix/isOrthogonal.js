test('.isOrthogonal()', 2, function () {
	var m = new MathLib.Matrix([[0.8, -0.6], [0.6, 0.8]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
	equal(m.isOrthogonal(), true, '.isOrthogonal() on orthogal matrix');
	equal(n.isOrthogonal(), false, '.isOrthogonal() on non orthogonal matrix');
});