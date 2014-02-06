test('.isNative()', 2, function () {
	Math.isNativeCheck = function () {
		return 42;
	};

	equal(MathLib.isNative(Math.sin), Math.sin, 'isNative of native method');
	equal(MathLib.isNative(Math.isNativeCheck), false, 'isNative of non native method');

	delete Math.isNativeCheck;
});