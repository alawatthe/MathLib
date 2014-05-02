test('.map()', 2, function () {
	var p = new MathLib.Line([1, 2, 3]),
			q = new MathLib.Line([2, 4, 6]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	deepEqual(res, q, '.map()');
	equal(res.type, 'line', '.type should be line');
});