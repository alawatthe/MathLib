test('.toString()', 26, function () {
	equal(MathLib.abs.toString(), 'x ⟼ |x|');
	equal(MathLib.arctan2.toString(), '(x, y) ⟼ arctan2(x, y)');
	equal(MathLib.binomial.toString(), '(n, k) ⟼ binomial(n, k)');
	equal(MathLib.cbrt.toString(), 'x ⟼ cbrt(x)');
	equal(MathLib.conjugate.toString(), 'x ⟼ conjugate(x)');
	equal(MathLib.degToRad.toString(), 'x ⟼ π/180*x');
	equal(MathLib.equivalent.toString(), '(x, y) ⟼ x ⇔ y');
	equal(MathLib.exp.toString(), 'x ⟼ exp(x)');
	equal(MathLib.factorial.toString(), 'n ⟼ n!');
	equal(MathLib.implies.toString(), '(x, y) ⟼ x ⇒ y');
	equal(MathLib.inverse.toString(), 'x ⟼ 1/x');
	equal(MathLib.lg.toString(), 'x ⟼ lg(x)');
	equal(MathLib.log.toString(), '(b, x) ⟼ log_b(x)');
	equal(MathLib.logGamma.toString(), 'x ⟼ log(Γ(x))');
	equal(MathLib.mod.toString(), '(n, m) ⟼ n mod m');
	equal(MathLib.negative.toString(), 'x ⟼ -x');
	equal(MathLib.pow.toString(), '(x, y) ⟼ (x)^(y)');
	equal(MathLib.rem.toString(), '(n, m) ⟼ n rem m');
	equal(MathLib.root.toString(), '(x, y) ⟼ (x)^(1/y)');
	equal(MathLib.sin.toString(), 'x ⟼ sin(x)');
	equal(MathLib.sqrt.toString(), 'x ⟼ sqrt(x)');

	equal(MathLib.exp(MathLib.sin).toString(), 'x ⟼ exp(sin(x))',
		'MathLib.exp(MathLib.sin).toString() should be x ⟼ exp(sin(x))');
	// equal(MathLib.pow(MathLib.sin, 2).toString(), 'x ⟼ sin(x)^2',
	// 'MathLib.pow(MathLib.sin, 2).toString() = x ⟼ sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toString(), 'x ⟼ sin(x)+2',
		'MathLib.plus(MathLib.sin, 2).toString() = x ⟼ sin(x)+2');
	equal(MathLib.plus(2, MathLib.sin).toString(), 'x ⟼ 2+sin(x)',
		'MathLib.plus(2, MathLib.sin).toString() = x ⟼ 2+sin(x)');
	equal(MathLib.times(2, MathLib.sin).toString(), 'x ⟼ 2*sin(x)',
		'MathLib.times(2, MathLib.sin).toString() = x ⟼ 2*sin(x)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toString(), 'x ⟼ sin(x)+cos(x)',
		'MathLib.plus(MathLib.sin, MathLib.cos).toString() = x ⟼ sin(x)+cos(x)');
});