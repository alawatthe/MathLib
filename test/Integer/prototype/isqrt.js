test('.prototype.isqrt()', 4, function () {
	ok((new MathLib.Integer('1')).isqrt().isEqual(new MathLib.Integer('1')));
	ok((new MathLib.Integer('16')).isqrt().isEqual(new MathLib.Integer('4')));
	ok((new MathLib.Integer('123456789')).isqrt().isEqual(new MathLib.Integer('11111')));
	ok((new MathLib.Integer('123456789123456789')).isqrt().isEqual(new MathLib.Integer('351364183')));
});