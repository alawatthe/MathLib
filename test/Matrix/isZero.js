test('.isZero()', 2, function () {
	var c = new MathLib.Complex(0, 0),
			m = new MathLib.Matrix([[0, 0, 0], [0, 0, c], [0, 0, 0]]),
			n = new MathLib.Matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);
	equal(m.isZero(), true, 'zero matrix');
	equal(n.isZero(), false, 'non zero matrix');
});