test('.times()', 3, function () {
	var v = new MathLib.Vector([1, 2, 3]),
			m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			r = new MathLib.Rational(2, 3);

	deepEqual(v.times(3), new MathLib.Vector([3, 6, 9]), '.times(number)');
	deepEqual(v.times(m), new MathLib.Vector([30, 36, 42]), '.times(matrix)');
	deepEqual(v.times(r), new MathLib.Vector([2 / 3, 4 / 3, 6 / 3]), '.times(rational)');
});