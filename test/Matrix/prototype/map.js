test('.map()', 2, function () {
	var p = new MathLib.Matrix([[1, 2], [3, 4]]),
			q = new MathLib.Matrix([[2, 4], [6, 8]]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	deepEqual(res, q, '.map()');
	equal(res.type, 'matrix', '.type should be matrix');
});