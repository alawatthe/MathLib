test('.adjoint()', 1, function () {
	var c = MathLib.Complex,
			m = new MathLib.Matrix([[new c(3, 1), 5, new c(0, -2)], [new c(2, -2), new c(0, 1), new c(-7, -13)]]),
			res = new MathLib.Matrix([[new c(3, -1), new c(2, 2)], [5, new c(0, -1)], [new c(0, 2), new c(-7, 13)]]);

	deepEqual(m.adjoint(), res, 'Adjoint matrix of a complex 2x3 matrix');
});