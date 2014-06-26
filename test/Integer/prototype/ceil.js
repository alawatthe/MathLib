test('.prototype.ceil()', 1, function () {
	ok((new MathLib.Integer('1234')).ceil().isEqual(new MathLib.Integer('1234')));
});