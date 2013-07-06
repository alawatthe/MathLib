test('.isPermutation()', 3, function () {
	var m = new MathLib.Matrix([[0, 1, 0], [1, 0, 0], [0, 0, 1]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 3, 4]]),
			o = new MathLib.Matrix([[0, 1, 0], [1, 0, 0], [0, 0, 0]]);
	equal(m.isPermutation(), true, 'permutation matrix');
	equal(n.isPermutation(), false, 'non permutation matrix');
	equal(o.isPermutation(), false, 'zero line');
});