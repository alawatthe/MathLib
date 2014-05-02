test('.forEach()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			arr = [];
	s.forEach(function (x) {
		arr.push(x);
	});

	deepEqual(arr, [1, 2, 3, 4], '.forEach()');
});