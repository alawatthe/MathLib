test('.scalarProduct()', 3, function () {
	var v = new MathLib.Vector([3, 1, 4]),
			w = new MathLib.Vector([1, 5, 9]),
			u = new MathLib.Vector([1, 2]);

	equal(v.scalarProduct(w), 44, '.scalarProduct()');
	throws(function () {
		u.scalarProduct(w);
	}, /Vector sizes not matching/, '.scalarProduct()');
	throws(function () {
		v.scalarProduct(u);
	}, /Vector sizes not matching/, '.scalarProduct()');
});
