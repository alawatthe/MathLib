test('.minus()', 2, function () {
	var v = new MathLib.Vector([3, 1, 4]),
			w = new MathLib.Vector([1, 5, 9]),
			u = new MathLib.Vector([1, 2]);

	equal(v.minus(w).isEqual(new MathLib.Vector([2, -4, -5])), true, '.minus()');
	throws(function () {
		v.minus(u);
	}, /Vector sizes not matching/, '.minus()');
});
