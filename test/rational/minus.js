test('.minus()', 2, function () {
  var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

  equal(r.minus(p).isEqual(new MathLib.Rational(-1,6)), true, '.minus()');
  equal(r.minus(2).isEqual(new MathLib.Rational(-3,2)), true, '.minus()');
});