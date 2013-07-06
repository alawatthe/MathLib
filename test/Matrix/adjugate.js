test('.adjugate()', 1, function () {
	var m = new MathLib.Matrix([[-3, 2, -5], [-1, 0, -3], [3, -4, 1]]),
			res = new MathLib.Matrix([[-12, 18, -6], [-8, 12, -4], [4, -6, 2]]);

	deepEqual(m.adjugate(), res, 'Adjoint matrix of a complex 2x3 matrix');
});