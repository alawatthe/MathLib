test('.rank()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [0, 5, 4], [0, 10, 2]]),
			n = new MathLib.Matrix([[1, 2, 3], [0, 6, 4], [0, 3, 2]]);
	equal(m.rank(), 3, '.rank()');
	equal(n.rank(), 2, '.rank()');
});