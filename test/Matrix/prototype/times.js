test('.times()', 5, function () {
	var m = new MathLib.Matrix([[1, 2], [3, 4]]),
			n = new MathLib.Matrix([[0, 1], [0, 0]]),
			res = new MathLib.Matrix([[0, 1], [0, 3]]),

			C  = MathLib.Complex,
			mc = new MathLib.Matrix([[new C(2, 3), 0, 3], [2, new C(-1, 5), 0], [new C(3, -4), new C(0, 1), 1]]),
			bc = new MathLib.Vector([new C(4, 2), 3, new C(1, 7)]),
			resc = new MathLib.Vector([new C(5, 37), new C(5, 19), new C(21, 0)]),
			r = new MathLib.Rational(2, 3);

	deepEqual(m.times(3), new MathLib.Matrix([[3, 6], [9, 12]]), 'matrix scalar multiplication');
	deepEqual(m.times(new C(0, 1)), new MathLib.Matrix([
		[new C(0, 1), new C(0, 2)],
		[new C(0, 3), new C(0, 4)]
	]), 'matrix scalar multiplication');
	deepEqual(m.times(n), res, 'multiplying two simple matrices');
	deepEqual(mc.times(bc), resc, 'complex matrix times complex vector');
	equal(m.times(r).isEqual(new MathLib.Matrix([[2 / 3, 4 / 3], [6 / 3, 8 / 3]])),
		true, 'complex matrix times rational number');
});