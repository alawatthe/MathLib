test('.reduce()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]),
			f = function (prev, cur) {
				return prev + cur;
			},
			res = v.reduce(f, 0);

	deepEqual(res, 6, '.reduce()');
});