test('.slice()', 2, function () {
	var v = new MathLib.Vector([1, 2, 3, 4, 5]);

	deepEqual(v.slice(1, 3), [2, 3], '.slice()');
	equal(MathLib.type(v.slice(1, 3)), 'array', '.slice()');
});