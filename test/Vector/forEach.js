test('.forEach()', 1, function () {
	var p = new MathLib.Vector([1, 2, 3]),
			str = '',
			f = function (x) {
				str += x;
			};

	p.forEach(f);

	deepEqual(str, '123', '.forEach()');
});