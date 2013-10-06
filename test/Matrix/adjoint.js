test('.adjoint()', 1, function () {
	var C = MathLib.Complex,
			m = new MathLib.Matrix([[new C(3, 1), 5, new C(0, -2)], [new C(2, -2), new C(0, 1), new C(-7, -13)]]),
			res = new MathLib.Matrix([[new C(3, -1), new C(2, 2)], [5, new C(0, -1)], [new C(0, 2), new C(-7, 13)]]);

	deepEqual(m.adjoint(), res, 'Adjoint matrix of a complex 2x3 matrix');
});
