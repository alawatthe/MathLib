test('.vectorProduct()', 3, function () {
	var v = new MathLib.Vector([1, 2, 3]),
			w = new MathLib.Vector([-7, 8, 9]),
			u = new MathLib.Vector([1, 2]),
			res = new MathLib.Vector([-6, -30, 22]);

	equal(v.vectorProduct(w).isEqual(res), true, '.vectorProduct()');
	equal(u.vectorProduct(w), undefined, '.vectorProduct()');
	equal(v.vectorProduct(u), undefined, '.vectorProduct()');
});