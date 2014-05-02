test('.every()', 2, function () {
	var m = new MathLib.Matrix([[1, 5, 3], [9, 5, 11], [-1, 9, 3]]),
			n = new MathLib.Matrix([[1, 3, 5], [7, 8, 1], [11, 6, 3]]),
			f = function (x) {
				return x % 2;
			};

	equal(m.every(f), true, '.every()');
	equal(n.every(f), false, '.every()');
});