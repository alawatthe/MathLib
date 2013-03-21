test('.isPrime()', 2, function () {
	equal(MathLib.isPrime(4567), true);
	equal(MathLib.isPrime(112), false);
});