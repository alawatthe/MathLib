test('.remove()', 3, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			res1 = new MathLib.Matrix([[1, 2, 3], [7, 8, 9]]),
			res2 = new MathLib.Matrix([[1, 3], [4, 6], [7, 9]]),
			res3 = new MathLib.Matrix([[4], [7]]);

	deepEqual(m.remove(1), res1, 'removing the second row');
	deepEqual(m.remove(false, 1), res2, 'removing the second column');
	deepEqual(m.remove([0], [1, 2]), res3, 'removing the first row and the second and third col');
});