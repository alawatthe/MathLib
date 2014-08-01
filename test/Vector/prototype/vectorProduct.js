test('.vectorProduct()', 3, function () {
	var v = new MathLib.Vector([1, 2, 3]),
			w = new MathLib.Vector([-7, 8, 9]),
			u = new MathLib.Vector([1, 2]),
			res = new MathLib.Vector([-6, -30, 22]);

	equal(v.vectorProduct(w).isEqual(res), true, '.vectorProduct()');
	throws(function () {
		u.vectorProduct(w);
	}, /Vectors are not three-dimensional/, '.vectorProduct()');
	throws(function () {
		v.vectorProduct(u);
	}, /Vectors are not three-dimensional/, '.vectorProduct()');
});
