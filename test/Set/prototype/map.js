test('.map()', 2, function () {
	var p = new MathLib.Set([1, 2, 3]),
			q = new MathLib.Set([2, 4, 6]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	ok(res.isEqual(q), '.map()');
	equal(res.type, 'set', '.type should be set');
});