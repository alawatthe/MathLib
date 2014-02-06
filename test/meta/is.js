test('.is()', 12, function () {
	var p = new MathLib.Point([1, 2, 3]),
			v = new MathLib.Vector([1, 2, 3]);

	equal(MathLib.is(2, 'number'), true);
	equal(MathLib.is(p, 'point'), true);
	equal(MathLib.is(p, 'vector'), true);
	equal(MathLib.is(p, 'object'), true);
	equal(MathLib.is(p, 'line'), false);
	equal(MathLib.is(v, 'vector'), true);
	equal(MathLib.is(v, 'point'), false);
	equal(MathLib.is([], 'array'), true);
	equal(MathLib.is(function () {}, 'function'), true);
	equal(MathLib.is(MathLib.sin, 'functn'), true);
	equal(MathLib.is(null, 'null'), true);
	equal(MathLib.is(undefined, 'undefined'), true);
});