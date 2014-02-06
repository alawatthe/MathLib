test('.off()', 1, function () {
	var i = 0,
			callback = function () {
				i++;
			};

	MathLib.on('error', callback);
	MathLib.on('warning', callback);

	MathLib.off('error', callback);
	MathLib.off('warning', callback);

	MathLib.error({});
	MathLib.warning({});

	equal(i, 0, 'check if callbacks are unbound');
});