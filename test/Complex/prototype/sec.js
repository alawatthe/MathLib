test('.sec()', 4, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sec().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).sec().re));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).sec(), new MathLib.Complex(0.15117629826557722714, 0.22697367539372159537)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).sec(), new MathLib.Complex(-0.036253496915868871891, -0.005164344607753179367)));
});