test('.inverse()', 3, function () {
	var c = MathLib.Complex,
			m1 = new MathLib.Matrix([[1, 2, 0], [2, 3, 0], [3, 4, 1]]),
			m2 = new MathLib.Matrix([[1, 2], [2, 4]]),
			m3 = new MathLib.Matrix([[new c(1, 2), new c(3, 4)], [new c(5, 6), new c(7, 8)]]);

	equal(m1.inverse().isEqual(new MathLib.Matrix([[-3, 2, 0], [2, -1, 0], [1, -2, 1]])), true, 'inverting a regular matrix');
	equal(m2.inverse(), undefined, 'inverting a singular matrix');
	equal(m3.inverse().isEqual(new MathLib.Matrix([[new c(-1 / 2, 7 / 16), new c(1 / 4, -3 / 16)], [new c(6 / 16, -5 / 16), new c(-2 / 16, 1 / 16)]])), true, 'inverting a regular complex matrix');
});