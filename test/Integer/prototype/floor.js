test('.prototype.floor()', 1, function () {
	ok((new MathLib.Integer('1234')).floor().isEqual(new MathLib.Integer('1234')));
});