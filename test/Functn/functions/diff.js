test('.diff()', 4, function () {
	ok(Math.abs(MathLib.cos.diff(0) - 0) < 1e-10, 'cos’(0) = 0');
	ok(Math.abs(MathLib.sin.diff(0) - 1) < 1e-10, 'sin’(0) = 1');
	ok(Math.abs(MathLib.exp.diff(0) - 1) < 1e-10, 'exp’(0) = 1');
	ok(Math.abs(MathLib.exp.diff(1) - Math.E) < 1e-10, 'exp’(1) = e');
});