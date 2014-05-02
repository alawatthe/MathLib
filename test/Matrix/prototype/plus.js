test('.plus()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
			res = new MathLib.Matrix([[2, 6, 10], [6, 10, 14], [10, 14, 18]]);
	deepEqual(m.plus(n), res, 'adding two simple matrices');
});