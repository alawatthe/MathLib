test('.gershgorin()', 2, function () {
	var C = MathLib.Complex,
			m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[new C(1, 4), 2, 3], [new C(2, 3), new C(4, 2), 6], [7, new C(0, 5), 9]]),
			resm = [new MathLib.Circle([1, 0], 5), new MathLib.Circle([5, 0], 10), new MathLib.Circle([9, 0], 9)],
			resn = [new MathLib.Circle([1, 4], 5), new MathLib.Circle([4, 2], 7), new MathLib.Circle([9, 0], 9)];

	deepEqual(m.gershgorin(), resm, 'Gershgorin circles of a 3x3 matrix');
	deepEqual(n.gershgorin(), resn, 'Gershgorin circles of a complex 3x3 matrix');
});