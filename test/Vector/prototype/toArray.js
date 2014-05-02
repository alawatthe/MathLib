test('.toArray()', 2, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	deepEqual(v.toArray(), [1, 2, 3], '.toArray()');
	equal(MathLib.type(v.toArray()), 'array', '.toArray()');
});