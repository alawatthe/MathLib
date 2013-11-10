test('.csc()', 5, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).csc().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).csc().re));

	equal((new MathLib.Complex(0)).csc().re, Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).csc(), new MathLib.Complex(0.22837506559968659341, -0.14136302161240780072)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).csc(), new MathLib.Complex(-0.005174473184019397654, 0.036275889628626011594)));
});