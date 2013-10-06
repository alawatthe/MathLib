test('.powerset()', 1, function () {
	var S = MathLib.Set,
			m = new MathLib.Set([1, 2, 3]),
			n = new MathLib.Set([new S([]), new S([1]), new S([2]), new S([3]), new S([1, 2]), new S([1, 3]), new S([2, 3]), new S([1, 2, 3])]);
	deepEqual(m.powerset(), n, '.powerset()');
});