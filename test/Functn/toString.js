test('.toString()', 6, function () {
	equal(MathLib.sin.toString(), 'x ⟼ sin(x)', 'MathLib.sin.toString() should be x ⟼ sin(x)');
	equal(MathLib.exp(MathLib.sin).toString(), 'x ⟼ exp(sin(x))', 'MathLib.exp(MathLib.sin).toString() should be x ⟼ exp(sin(x))');
	// equal(MathLib.pow(MathLib.sin, 2).toString(), 'x ⟼ sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toString() = x ⟼ sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toString(), 'x ⟼ sin(x)+2', 'MathLib.plus(MathLib.sin, 2).toString() = x ⟼ sin(x)+2');
	equal(MathLib.plus(2, MathLib.sin).toString(), 'x ⟼ 2+sin(x)', 'MathLib.plus(2, MathLib.sin).toString() = x ⟼ 2+sin(x)');
	equal(MathLib.times(2, MathLib.sin).toString(), 'x ⟼ 2*sin(x)', 'MathLib.times(2, MathLib.sin).toString() = x ⟼ 2*sin(x)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toString(), 'x ⟼ sin(x)+cos(x)', 'MathLib.plus(MathLib.sin, MathLib.cos).toString() = x ⟼ sin(x)+cos(x)');
});