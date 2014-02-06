test('.on()', 1, function () {
	var i = 0,
			callback = function () {
				i++;
			};

	MathLib.on('error', callback);
	MathLib.on('warning', callback);

	MathLib.error({});
	MathLib.warning({});

	equal(i, 2, 'check if callbacks are getting called');

	MathLib.off('error', callback);
	MathLib.off('warning', callback);
});