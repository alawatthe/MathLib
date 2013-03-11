test('.scalarProduct()', 3, function () {
	var v = new MathLib.Vector([3, 1, 4]),
			w = new MathLib.Vector([1, 5, 9]),
			u = new MathLib.Vector([1, 2]);

	equal(v.scalarProduct(w), 44, '.scalarProduct()');
	equal(u.scalarProduct(w), undefined, '.scalarProduct()');
	equal(v.scalarProduct(u), undefined, '.scalarProduct()');
});