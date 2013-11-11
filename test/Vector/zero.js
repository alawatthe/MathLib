test('zero()', 1, function () {
	var v = new MathLib.Vector.zero(3);

	equal(v.isZero(), true, 'testing zero vector');
});