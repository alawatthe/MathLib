test('.neagtive()', 1, function () {
	var v = new MathLib.Vector([3, 1, 4]);

	equal(v.negative().isEqual(new MathLib.Vector([-3, -1, -4])), true, '.negative()');
});