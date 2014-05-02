test('.indexOf()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	deepEqual(s.indexOf(3), 2, '.indexOf()');
	deepEqual(s.indexOf(5), -1, '.indexOf()');
});