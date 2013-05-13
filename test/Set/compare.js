test('.compare()', 3, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			n = new MathLib.Set([1, 2, 3, 4, 5]);
	deepEqual(s.compare(s), 0, '.compare()');
	deepEqual(s.compare(m), -1, '.compare()');
	deepEqual(m.compare(n), -1, '.compare()');
});