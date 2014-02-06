test('.some()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [0, 5, 4], [0, 10, 2]]),
			n = new MathLib.Matrix([[2, 4, 6], [0, 6, 4], [0, 8, 2]]),
			f = function (x) {
				return x % 2;
			};

	equal(m.some(f), true, '.some()');
	equal(n.some(f), false, '.some()');
});