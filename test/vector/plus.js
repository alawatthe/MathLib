test('.plus()', 2, function () {
	var v = new MathLib.Vector([3, 1, 4]),
			w = new MathLib.Vector([1, 5, 9]),
			u = new MathLib.Vector([1, 2]);
	equal(v.plus(w).isEqual(new MathLib.Vector([4, 6, 13])), true, '.plus()');
	equal(v.plus(u), undefined, '.plus()');
});