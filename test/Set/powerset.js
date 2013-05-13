test('.powerset()', 1, function () {
	var s = MathLib.Set,
			m = new MathLib.Set([1, 2, 3]),
			n = new MathLib.Set([new s([]), new s([1]), new s([2]), new s([3]), new s([1, 2]), new s([1, 3]), new s([2, 3]), new s([1, 2, 3])]);
	deepEqual(m.powerset(), n, '.powerset()');
});