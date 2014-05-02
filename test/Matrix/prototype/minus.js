test('.minus()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
			res = new MathLib.Matrix([[0, -2, -4], [2, 0, -2], [4, 2, 0]]),
			res1 = new MathLib.Matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
	deepEqual(m.minus(n), res, 'subtracting two simple matrices');
	deepEqual(n.minus(n), res1, 'subtracting two simple matrices');
});