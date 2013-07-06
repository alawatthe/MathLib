test('.isPosDefinite()', 2, function () {
	var m = new MathLib.Matrix([[2, -1, 0], [-1, 2, -1], [0, -1, 2]]),
			n = new MathLib.Matrix([[1, 2], [2, 1]]);
	equal(m.isPosDefinite(), true, 'positiv definite matrix');
	equal(n.isPosDefinite(), false, 'non positiv definite matrix');
});