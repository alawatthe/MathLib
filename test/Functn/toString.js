test('.toString()', 7, function () {
	equal(MathLib.sin.toString(), 'sin(x)', 'MathLib.sin.toString() should be sin(x)');
	equal(MathLib.sin.toString('z'), 'sin(z)', 'custom bound variable');
	equal(MathLib.exp(MathLib.sin).toString(), 'exp(sin(x))', 'MathLib.exp(MathLib.sin).toString() should be exp(sin(x))');
	// equal(MathLib.pow(MathLib.sin, 2).toString(), 'sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toString() = sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toString(), 'sin(x)+2', 'MathLib.plus(MathLib.sin, 2).toString() = sin(x)+2');
	equal(MathLib.plus(2, MathLib.sin).toString(), '2+sin(x)', 'MathLib.plus(2, MathLib.sin).toString() = 2+sin(x)');
	equal(MathLib.times(2, MathLib.sin).toString(), '2*sin(x)', 'MathLib.times(2, MathLib.sin).toString() = 2*sin(x)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toString(), 'sin(x)+cos(x)', 'MathLib.plus(MathLib.sin, MathLib.cos).toString() = sin(x)+cos(x)');
});