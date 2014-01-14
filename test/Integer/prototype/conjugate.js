test('.prototype.conjugate()', 1, function () {
	var i = new MathLib.Integer('1234'),
			j = i.conjugate();

	ok(j.isEqual(i));
});