test('.prototype.copy()', 10, function () {
	var r1 = new MathLib.Rational(3, 1),
			r2 = r1.copy();

	equal(r2.numerator, r1.numerator);
	equal(r2.denominator, r1.denominator);

	r2.numerator = 2;
	r2.denominator = 4;

	equal(r1.numerator, 3);
	equal(r1.denominator, 1);
	equal(r2.numerator, 2);
	equal(r2.denominator, 4);

	r1.numerator = 5;
	r1.denominator = 6;

	equal(r1.numerator, 5);
	equal(r1.denominator, 6);
	equal(r2.numerator, 2);
	equal(r2.denominator, 4);
});