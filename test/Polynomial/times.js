test('.times()', 4, function () {
	var p = new MathLib.Polynomial(3),
			p1 = new MathLib.Polynomial([1, 2, 3]),
			r = new MathLib.Rational(2, 3);
	deepEqual(p1.times(5), new MathLib.Polynomial([5, 10, 15]), '.times(integer)');
	deepEqual(p.times(p1), new MathLib.Polynomial([0, 0, 0, 1, 2, 3]), '.times(polynomial)');
	deepEqual(p1.times(p), new MathLib.Polynomial([0, 0, 0, 1, 2, 3]), '.times(polynomial)');
	deepEqual(p1.times(r), new MathLib.Polynomial([2 / 3, 4 / 3, 6 / 3]), '.times(rational)');
});