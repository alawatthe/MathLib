test('.plus()', 3, function () {
	var p = new MathLib.Polynomial(3),
			p1 = new MathLib.Polynomial([1, 2, 3]);
	deepEqual(p1.plus(12), new MathLib.Polynomial([13, 2, 3]), '.plus(integer)');
	deepEqual(p.plus(p1), new MathLib.Polynomial([1, 2, 3, 1]), '.plus(polynomial)');
	deepEqual(p1.plus(p), new MathLib.Polynomial([1, 2, 3, 1]), '.plus(polynomial)');
});