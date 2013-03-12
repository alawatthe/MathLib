test('.sin()', 1, function () {
	ok(MathLib.isEqual(MathLib.sin(new MathLib.Complex(3, 4)), new MathLib.Complex(3.853738037919377, -27.016813258003932)));
});