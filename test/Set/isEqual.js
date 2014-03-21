test('.isEqual()', 3, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			n = new MathLib.Set([1, 2, new MathLib.Complex(3, 0), 4]);
	deepEqual(s.isEqual(s), true, '.isEqual()');
	deepEqual(s.isEqual(m), false, '.isEqual()');
	deepEqual(s.isEqual(n), false, '.isEqual()');
});