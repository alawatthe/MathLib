test('.version', 1, function () {
	ok(/\d+\.\d+\.\d+/.test(MathLib.version));
});