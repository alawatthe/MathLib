test('.every()', 2, function () {
	var p = new MathLib.Vector([1, 2, 3]);

	equal(p.every(function (x) {return x > 0; }), true, '.every()');
	equal(p.every(function (x) {return x < 0; }), false, '.every()');
});