test('.toString()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toString(), '3*x^2+2*x+1', '.toString()');
	deepEqual(q.toString(), '1*x^2-1', '.toString()');
});