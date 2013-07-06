test('.solve()', 7, function () {
	var c  = MathLib.Complex,
			A1 = new MathLib.Matrix([[1, 2, 3], [1, 1, 1], [3, 3, 1]]),
			b1 = new MathLib.Vector([2, 2, 0]),
			x1 = new MathLib.Vector([5, -6, 3]),
			
			A2 = new MathLib.Matrix([[1, 0, 3], [2, 1, 0], [0, 0, 1]]),
			b2 = new MathLib.Vector([10, 3, 3]),
			x2 = new MathLib.Vector([1, 1, 3]),
			
			A3 = new MathLib.Matrix([[new c(2, 3), 0, 3], [2, new c(-1, 5), 0], [new c(3, -4), new c(0, 1), 1]]),
			b3 = new MathLib.Vector([new c(5, 37), new c(5, 19), new c(21, 0)]),
			x3 = new MathLib.Vector([new c(4, 2), new c(3, 0), new c(1, 7)]),

			A4 = new MathLib.Matrix([[2, 4], [1, 2]]),
			A5 = new MathLib.Matrix([[1, 0, 1], [0, 1, 1], [0, 0, 0]]);

	ok(A1.solve(b1).isEqual(x1), 'Solving a system of linear equations');
	deepEqual(A1.times(x1), b1, 'Showing the solution is right');

	deepEqual(A2.solve(b2), x2, 'Solving a system of linear equations');

	ok(A3.solve(b3).isEqual(x3), 'Solving a complex system of linear equations');

	equal(A4.solve([1, 0]), undefined, '2x2 linear system with no solution');
	deepEqual(A4.solve([2, 1]), [1, 0], '2x2 linear system with more than one solution');

	deepEqual(A5.solve([2, 1, 0]), [2, 1, 0], '3x3 linear system with more than one solution');
});