test('.toArray()', 4, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			a = m.toArray();

	deepEqual(a, [[1, 2, 3], [4, 5, 6], [7, 8, 9]], '.toArray()');
	equal(Object.prototype.toString.call(a), '[object Array]', '.toArray()');
	equal(a.type, undefined, 'get sure that it is not a Mathlib object');
	a[0][0] = 42;
	deepEqual(m, new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), 'make sure the matrix hasn\'t changed');
});