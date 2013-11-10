test('.inverse()', 9, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).inverse().re));
	ok(MathLib.isPosZero(new MathLib.Complex(Infinity).inverse().re));
	ok(MathLib.isPosZero(new MathLib.Complex(Infinity).inverse().im));

	equal((new MathLib.Complex(+0, +0)).inverse().re, Infinity);
	equal((new MathLib.Complex(+0, -0)).inverse().re, Infinity);
	equal((new MathLib.Complex(-0, +0)).inverse().re, Infinity);
	equal((new MathLib.Complex(-0, -0)).inverse().re, Infinity);

	deepEqual((new MathLib.Complex(3, 4)).inverse(), new MathLib.Complex(3 / 25, -4 / 25));
	deepEqual((new MathLib.Complex(0, 2)).inverse(), new MathLib.Complex(0, -1 / 2));
});