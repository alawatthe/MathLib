test('.map()', 2, function () {
	var p = new MathLib.Point([1, 2, 3]),
			q = new MathLib.Point([2, 4, 6]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	deepEqual(res, q, '.map()');
	equal(res.type, 'point', '.type should be point');
});