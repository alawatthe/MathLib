test('.arccsc()', 17, function () {
	var n1p0 = (new MathLib.Complex(-1, +0)).arccsc(),
			n1n0 = (new MathLib.Complex(-1, -0)).arccsc(),
			p0p0 = (new MathLib.Complex(+0, +0)).arccsc(),
			p0n0 = (new MathLib.Complex(+0, -0)).arccsc(),
			n0p0 = (new MathLib.Complex(-0, +0)).arccsc(),
			n0n0 = (new MathLib.Complex(-0, -0)).arccsc(),
			p1p0 = (new MathLib.Complex(1, +0)).arccsc(),
			p1n0 = (new MathLib.Complex(1, -0)).arccsc();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arccsc().re));
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arccsc().re));
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arccsc().im));


	ok(MathLib.isEqual(n1p0.re, -Math.PI / 2));
	ok(MathLib.isNegZero(n1p0.im));
	ok(MathLib.isEqual(n1n0.re, -Math.PI / 2));
	ok(MathLib.isPosZero(n1n0.im));


	equal(p0p0.re, Infinity);
	equal(p0n0.re, Infinity);
	equal(n0p0.re, Infinity);
	equal(n0n0.re, Infinity);


	ok(MathLib.isEqual(p1p0.re, Math.PI / 2));
	ok(MathLib.isNegZero(p1p0.im));
	ok(MathLib.isEqual(p1n0.re, Math.PI / 2));
	ok(MathLib.isPosZero(p1n0.im));


	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arccsc(), new MathLib.Complex(0.18631805410781552582, -0.39656823011232897892)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arccsc(), new MathLib.Complex(-0.11875073130741175420, -0.16044553377450493240)));
});