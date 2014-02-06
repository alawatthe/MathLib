test('.prototype.copy()', 3, function () {
	var i = new MathLib.Integer('1234'),
			j = i.copy();

	ok(j.isEqual(i));

	j.sign = '-';
	j.data[0] = 4321;

	equal(i.sign, '+');
	equal(i.data[0], 1234);
});