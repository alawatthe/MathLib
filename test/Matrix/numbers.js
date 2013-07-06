test('numbers()', 3, function () {
	var m = new MathLib.Matrix.numbers(3, 2, 2),
			n = new MathLib.Matrix.numbers(4, 2),
			o = new MathLib.Matrix.numbers(5);
	deepEqual(m, new MathLib.Matrix([[3, 3], [3, 3]]), 'static number method');
	deepEqual(n, new MathLib.Matrix([[4, 4], [4, 4]]), 'static number method');
	deepEqual(o, new MathLib.Matrix([[5]]), 'static number method');
});
