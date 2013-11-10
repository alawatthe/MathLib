test('.abs()', 4, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).abs()));
	equal((new MathLib.Complex(Infinity)).abs(), Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(0, 0)).abs(), 0), 'Absolut value of a complex number');
	ok(MathLib.isEqual((new MathLib.Complex(3, 4)).abs(), 5), 'Absolut value of a complex number');
});